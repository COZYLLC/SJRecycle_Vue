<template>
  <div class="doRecycle">
    <b-modal v-model="isCardModalActive" :width="640" :can-cancel="false">
      <div class="card">
        <div class="card-content">
          <div class="content" v-if="available">
            <section>
              <h1 class="title is-4 centered" style="text-align: center">
                분리수거 사진 업로드
              </h1>
              <b-field>
                <b-upload
                  v-model="dropFiles"
                  drag-drop
                  expanded
                  accept="image/*"
                >
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon
                          pack="fas"
                          icon="upload"
                          size="is-large"
                        ></b-icon>
                      </p>
                      <p>{{ selectedFile }}</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
            </section>
            <b-button
              :disabled="!enableToUse"
              type="is-success"
              style="width: 100%; margin-top: 10px"
              v-on:click="uploadImage"
              >업로드</b-button
            >
          </div>
          <div class="content" v-if="!available" style="text-align: center">
            <section>
              <h1 class="is-size-4">분리수거 시간이 아니네요.</h1>
              <h1 class="is-size-1">😥</h1>
            </section>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Question Start -->

    <b-field label="쓰레기 배출량">
      <b-slider :min="0" :max="10" ticks v-model="amount"></b-slider>
    </b-field>
    <div
      class="card"
      v-for="(question, i) in questions"
      :key="i"
      style="margin-bottom: 2vh"
    >
      <div class="card-content">
        <h1 class="title is-4">{{ question.question }}</h1>
        <div class="content">
          <section>
            <div class="block">
              <b-field
                v-for="(selection, j) in questions.selections[i]"
                :key="selection"
              >
                <b-radio
                  v-model="radio[i]"
                  :name="'Q' + i"
                  :native-value="j + 1"
                  >{{ selection }}</b-radio
                >
              </b-field>
            </div>
          </section>
        </div>
      </div>
    </div>
    <b-button
      type="is-success"
      style="width: 100%"
      v-on:click="submit"
      :disabled="!submitable"
      >확인</b-button
    >
    <!-- Question End -->
  </div>
</template>

<script>
import { SnackbarProgrammatic as Snackbar } from "buefy";
export default {
  name: "DoRecycle",
  data() {
    return {
      dropFiles: {},
      available: true,
      isCardModalActive: true,
      radio: [],
      amount: 0,
      questions: [],
      enableToUse: false,
      grade_class: "",
      submitable: true,
    };
  },
  computed: {
    selectedFile() {
      if (this.dropFiles.name == null) {
        return "파일을 선택해주세요.";
      }
      return this.dropFiles.name;
    },
  },
  created() {
    const date = this.$moment();
    if (process.env.NODE_ENV == "production") {
      if (!(date.day() == 2 || date.day() == 5) || date.hour() > 13) {
        this.available = false;
        Snackbar.open({
          message: "수요일과 금요일 1시 이전에만 배출할 수 있습니다.",
          type: "is-danger",
        });
        return;
      }
    }

    this.grade_class = this.$store.getters.getGradeClass;
    if (this.grade_class == null || this.grade_class == "") {
      this.$router.go();
      Snackbar.open({
        message: "인증 후 이용해주세요.",
        type: "is-danger",
      });
      this.enableToUse = false;
      return;
    } else {
      this.enableToUse = true;
    }

    this.$axios.get(`${process.env.VUE_APP_API_URL}/question`).then((res) => {
      if (res.data.reqSuccess) {
        var questions = res.data.questions;
        questions.selections = [];
        questions.forEach((item) => {
          // parsing selections
          var selections = [];
          for (var i = 0; i < 6; i++) {
            if (item[`sel_${i + 1}`] != "") {
              selections.push(item[`sel_${i + 1}`]);
            }
          }
          questions.selections.push(selections);
        });
        this.questions = questions;
        console.log(this.questions);
      }
    });
  },
  methods: {
    uploadImage() {
      console.log(this.dropFiles);
      if (this.dropFiles != "" && this.dropFiles != null) {
        this.isCardModalActive = false;
      } else {
        alert("사진을 업로드해주세요!");
      }
    },
    submit() {
      this.submitable = false;
      let formData = new FormData();
      for (let i = 0; i < this.questions.length; i++) {
        if (this.radio[i] == undefined) {
          alert("한 항목도 빠짐 없이 체크해주세요!");
          return;
        }
        formData.append(
          "answers",
          JSON.stringify({
            question_id: this.questions[i].question_id,
            answer: this.radio[i],
          })
        );
      }

      formData.append("img", this.dropFiles);
      formData.append("grade_class", this.grade_class);
      formData.append("amount", this.amount / 10);

      var currTime = this.$moment().format("YYYY-MM-DD");
      formData.set("time", currTime);

      if (this.dropFiles != "" && this.dropFiles != null) {
        this.$axios
          .post(`${process.env.VUE_APP_API_URL}/trash/discharge`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.reqSuccess == true) {
              this.$router.push("/");
              Snackbar.open(res.data.message);
            } else {
              try {
                Snackbar.open({
                  message: `${res.data.message} ErrorCode: ${res.data.err.errno}, ${res.data.err.code}`,
                  type: "is-danger",
                });
              } catch (error) {
                Snackbar.open({
                  message: `오류가 발생했습니다. Error: ${error}`,
                  type: "is-danger",
                });
              }
            }
          })
          .catch((err) => {
            Snackbar.open({
              message: `오류가 발생했습니다. Error: ${err}`,
              type: "is-danger",
            });
          });
      }
    },
  },
};
</script>
