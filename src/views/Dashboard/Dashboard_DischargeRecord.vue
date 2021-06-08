<template>
  <section>
    <b-table
      :data="discharges"
      ref="table"
      paginated
      per-page="10"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="discharge_id"
      :detail-transition="`fade`"
      @details-open="(row) => getAnswers(row.discharge_id)"
      :show-detail-icon="true"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="discharge_id"
        label="ID"
        numeric
        centered
        v-slot="props"
      >
        {{ props.row.discharge_id }}
      </b-table-column>

      <b-table-column
        field="grade_class"
        label="학년반"
        centered
        v-slot="props"
        width="80"
      >
        {{ props.row.grade_class }}
      </b-table-column>

      <b-table-column
        field="amount"
        width="80"
        sortable
        label="배출량"
        v-slot="props"
        centered
      >
        <span> {{ props.row.amount * 100 }}% </span>
      </b-table-column>
      <b-table-column
        field="point"
        label="분리배출 점수"
        v-slot="props"
        width="200"
        centered
        sortable
      >
        <span>
          {{ props.row.point }}
        </span>
      </b-table-column>

      <b-table-column
        field="time"
        label="날짜"
        sortable
        centered
        v-slot="props"
      >
        <span class="tag is-success">
          {{ new Date(props.row.time).toLocaleDateString() }}
        </span>
      </b-table-column>

      <template #detail="props">
        <article class="media">
          <div class="media-content">
            <figure class="media-left" style="margin-bottom: 2vh">
              <p class="image">
                <b-image
                  :src="props.row.image_url"
                  :responsive="true"
                  style="max-width: 500px"
                />
              </p>
            </figure>
            <div class="content">
              <h6 class="title is-4">질문 결과</h6>
              <div
                v-for="(answer, i) in answers[props.row.discharge_id]"
                :key="i"
              >
                <p class="title is-6">
                  {{ i + 1 }}. {{ questions[i].question }}
                </p>
                {{ questions[i][`sel_${answer.answer}`] }}
              </div>

              <!--
              <b-button
                style="margin-top: 1vh"
                type="is-danger"
                v-on:click="removeRow(props.row.discharge_id)"
                >삭제</b-button
              >-->
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
import { SnackbarProgrammatic } from "buefy";
export default {
  data() {
    return {
      discharges: [],
      defaultOpenedDetails: [1],
      answers: [],
      questions: [],
    };
  },
  computed: {
    answerComputed() {
      return this.answers;
    },
  },
  created() {
    this.$axios.get(`${process.env.VUE_APP_API_URL}/question`).then((res) => {
      console.log(res.data);
    });
    const date = this.$moment();
    const dateString = date.format("YYYY-MM");

    this.$axios
      .get(
        `${
          process.env.VUE_APP_API_URL
        }/trash/byDate?start=${dateString}-01&end=${dateString}-${date
          .endOf("month")
          .date()}`
      )
      .then((res) => {
        console.log(res);
        this.discharges = res.data.discharges;
        if (res.data.reqSuccess && res.data.discharges != null) {
          this.questions = res.data.questions;
        } else {
          SnackbarProgrammatic.open({
            message: "데이터가 없는 것 같아요.",
            type: "is-warning",
          });
          this.discharges = [
            {
              discharge_id: "데이터가 없습니다.",
              grade_class: "",
              point: "",
              amount: "",
              time: "",
            },
          ];
        }
      });
  },
  methods: {
    removeRow(discharge_id) {
      this.$axios
        .get(
          `${process.env.VUE_APP_API_URL}/trash/remove?discharge_id=${discharge_id}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.reqSuccess) {
            console.log("done!!!!");
          }
        });
    },
    getAnswers(discharge_id) {
      this.$axios
        .get(
          `${process.env.VUE_APP_API_URL}/trash/answers?discharge_id=${discharge_id}`
        )
        .then((res) => {
          this.answers[discharge_id] = res.data.answers;
          this.$forceUpdate();
        });
    },
  },
};
</script>