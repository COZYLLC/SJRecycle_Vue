<template>
  <div>
    <div class="noDischarge" v-if="noDischarge">
      <h1>
        이 달에는 아무도 분리수거 검사를 하지 않은 것 같네요. <br />자세한
        내역은 분리수거 현황 메뉴를 확인해주세요.
      </h1>
    </div>
    <div class="tile is-ancestor" v-if="!noDischarge">
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
                {{ first.amount.grade_class }} |
                {{ first.amount.amount * 100 }} %
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
<script>
export default {
  data() {
    return {
      noDischarge: false,
      discharge: {
        amount: 0,
        point: 0,
      },
      first: {
        amount: {},
        point: {},
      },
    };
  },
  created() {
    const date = this.$moment();
    const dateString = date.format("YYYY-MM");
    const endOfMonth = date.endOf("month").date();
    console.log(process.env.BASE_URL);
    this.$axios
      .get(
        `${process.env.VUE_APP_API_URL}/trash/averageAmount?start=${dateString}-01&end=${dateString}-${endOfMonth}`
      )
      .then((res) => {
        if (res.data.averageAmount == null) {
          this.noDischarge = true;
        } else {
          this.discharge.amount = parseFloat(res.data.averageAmount) * 100;
        }
      });
    this.$axios
      .get(
        `${process.env.VUE_APP_API_URL}/trash/averagePoint?start=${dateString}-01&end=${dateString}-${endOfMonth}`
      )
      .then((res) => {
        this.discharge.point = res.data.averagePoint.toFixed(2);
      });
    this.$axios
      .get(`${process.env.VUE_APP_API_URL}/rank/first_amount`)
      .then((res) => {
        this.first.amount = res.data.discharge;
      });
    this.$axios
      .get(`${process.env.VUE_APP_API_URL}/rank/first_point`)
      .then((res) => {
        this.first.point = res.data.discharge;
      });
  },
};
</script>
