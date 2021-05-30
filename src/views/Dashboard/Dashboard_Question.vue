<template>
  <div>
    <h1 class="title is-size-3">질문지 관리</h1>
    <b-menu style="margin-bottom:2vh">
      <b-menu-list>
        <b-menu-item
          v-for="item in menu"
          :key="item"
          :icon="item.icon"
          :label="item.label"
          active="true"
        ></b-menu-item>
      </b-menu-list>
    </b-menu>
    <div
      class="card"
      v-for="(question, i) in questions"
      :key="i"
      style="margin-bottom: 2vh;"
    >
      <div class="card-content">
        <h1 class="title is-4">{{ question.question }}</h1>
        <div class="content">
          <section>
            <div class="block">
              <b-field
                v-for="selection in questions.selections[i]"
                :key="selection"
              >
                {{ selection }}
              </b-field>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
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
  data() {
    return {
      menu: [
        {
          label: "질문 추가",
          icon: "plus",
        },
      ],
      dropFiles: {},
      available: true,
      isCardModalActive: true,
      radio: [],
      amount: 0,
      questions: [],
    };
  },
  methods: {},
};
</script>

<style>
.router-link-active {
  color: black;
}

.router-link-exact-active {
  color: black;
}
</style>