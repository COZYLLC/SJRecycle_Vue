<template>
  <section>
    <b-table
      :data="data"
      ref="table"
      paginated
      per-page="5"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="id"
      :detail-transition="`fade`"
      @details-open="(row) => $buefy.toast.open(`Expanded ${row.discharge_id}`)"
      :show-detail-icon="true"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <b-table-column
        field="discharge_id"
        label="ID"
        width="40"
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
          <figure class="media-left">
            <p class="image">
              <img
                :src="props.row.image_url"
                ratio="1by1"
                style="width: 25vw"
              />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <h6 class="title is-4">질문 결과</h6>
              <div v-for="(answer, i) in answers" :key="i">
                <p class="title is-6">
                  {{ i + 1 }}. {{ questions[i].question }}
                </p>
                {{ questions[i][`sel_${answer.answer}`] }}
              </div>
              <b-button style="margin-top:1vh" type="is-danger" v-on:click="removeRow(props.row.discharge_id)">삭제</b-button>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
const data = require("@/sample.json");

export default {
  data() {
    return {
      data,
      defaultOpenedDetails: [1],
      answers: [
        {
          question_id: 0,
          answer: 1,
        },
        {
          question_id: 1,
          answer: 2,
        },
        {
          question_id: 2,
          answer: 3,
        },
        {
          question_id: 3,
          answer: 3,
        },
        {
          question_id: 4,
          answer: 3,
        },
        {
          question_id: 5,
          answer: 1,
        },
      ],
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
      this.questions = res.data.questions;
    });
  },
  methods: {
    getAnswers() {
      this.$axios
        .get(`${process.env.VUE_APP_API_URL}/trash/answers`)
        .then((res) => {
          this.answers = res.data.answers;
        });
    },
    removeRow(discharge_id){
      this.$axios.get(`${process.env.VUE_APP_API_URL}/trash/remove?discharge_id=${discharge_id}`)
      .then(res => {
        console.log(res)
        if (res.data.reqSuccess) {
          console.log("done!2")
        }
      })
    }
  },
};
</script>