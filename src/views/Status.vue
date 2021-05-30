<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <p style="font-size: 20px; font-weight: bold; margin-bottom: 5px">
              {{ grade }}학년 {{ cl }} 반<br />
            </p>

            <article class="tile is-child notification is-primary">
              <p class="title is-size-4-mobile">최근 분리배출 점수</p>
              <p class="subtitle">{{ trash.point }}</p>
            </article>
            <article class="tile is-child notification is-warning">
              <p class="title is-size-4-mobile">최근 쓰레기 배출량</p>
              <p class="subtitle">
                <b-field>
                  <b-progress
                    type="is-success"
                    :value="trash.amount * 100"
                    show-value
                    format="percent"
                /></b-field>
              </p>
            </article>
            <article
              class="tile is-child notification is-info"
              v-on:click="$router.push('/dorecycle')"
            >
              <p class="title is-size-4-mobile">분리수거 하기</p>
              <p class="subtitle">→</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      grade: 3,
      cl: 3,
      trash: {
        point: 0,
        amount: 0,
      },
    };
  },
  created() {
    this.$axios
      .get(
        `${process.env.VUE_APP_API_URL}/trash/recentDischarge?grade_class=${this.grade}-${this.cl}`
      )
      .then((res) => {
        if (res.data.reqSuccess) {
          this.trash.point = res.data.data.point;
          this.trash.amount = res.data.data.amount;
        }
      });
  },
};
</script>
