<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title is-size-4-mobile">이번 달 분리수거 점수 1등</p>
              <p class="subtitle">
                {{ first.point.grade_class }} | {{ first.point.point }} 점
              </p>
            </article>
            <article class="tile is-child notification is-warning">
              <p class="title is-size-4-mobile">이번 달 쓰레기 배출량 1등</p>
              <p class="subtitle">
                {{ first.amount.grade_class }} | {{ first.amount.amount * 100 }} %
              </p>
            </article>
            <article class="tile is-child notification is-info">
              <p class="title is-size-4-mobile">평균 쓰레기 배출량</p>
              <p class="subtitle">
                <b-field style="padding-top: 1vh">
                  <b-progress
                    type="is-success"
                    :value="discharge.amount"
                    show-value
                    format="percent"
                /></b-field>
              </p>
            </article>
            <article class="tile is-child notification is-info">
              <p class="title is-size-4-mobile">평균 분리배출 점수</p>
              <p class="subtitle">{{ discharge.point }} 점</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      discharge: {
        amount: 0,
        point: 0,
      },
      first: {
        amount: {
          discharge_id: 54,
          time: this.$moment("2021-05-29"),
          amount: 0.52,
          grade_class: "3-3",
          image_url: "https://yoon-lab.xyz:23409/v1/fsfdsk",
          point: 520,
        },
        point: {
          discharge_id: 54,
          time: this.$moment("2021-05-29"),
          amount: 0.52,
          grade_class: "3-3",
          image_url: "https://yoon-lab.xyz:23409/v1/fsfdsk",
          point: 520,
        },
      },
    };
  },
  created() {
    this.$axios
      .get(
        `${process.env.VUE_APP_API_URL}/trash/averageAmount?start=2021-05-01&end=2021-05-31`
      )
      .then((res) => {
        console.log(res.data)
        this.discharge.amount = parseInt(
          (res.data.averageAmount.toFixed(2) * 100).toFixed(0)
        );
      });
    this.$axios
      .get(
        `${process.env.VUE_APP_API_URL}/trash/averagePoint?start=2021-05-01&end=2021-05-31`
      )
      .then((res) => {
        this.discharge.point = res.data.averagePoint.toFixed(2);
      });
    // this.$axios.get(`${process.env.VUE_APP_API_URL}/rank/first_amount`).then((res) => {
    //   this.first.amount = res.data.discharge.amount
    // })
    // this.$axios.get(`${process.env.VUE_APP_API_URL}/rank/first_point`).then((res) => {
    //   this.first.score = res.data.discharge.score
    // })
  },
};
</script>