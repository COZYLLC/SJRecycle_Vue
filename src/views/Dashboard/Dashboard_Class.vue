<template>
  <div>
    <h1 class="title is-size-3">학급 관리</h1>
    <b-menu>
      <b-menu-list>
        <b-menu-item v-for="grade in 3" :key="grade">
          <template #label="props">
            {{ grade }}학년
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'caret-up' : 'caret-down'"
            ></b-icon>
          </template>
          <b-menu-item
            v-for="classes in 8"
            :key="classes"
            :label="classes + '반'"
            v-on:click="changeClass(grade, classes)"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
    <div class="container" v-if="$route.query.grade_class != undefined" style="margin-top:2vh">
      <div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical">
            {{ $route.query.grade_class }} 반 쓰레기 현황
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-primary">
                  <p class="title is-size-4-mobile">최근 분리수거 점수</p>
                  <p class="subtitle">{{ discharge.score }}</p>
                </article>
                <article class="tile is-child notification is-warning">
                  <p class="title is-size-4-mobile">최근 쓰레기 배출량</p>
                  <p class="subtitle">{{ discharge.amount }}</p>
                </article>
                <article class="tile is-child notification is-info">
                  <p class="title is-size-4-mobile">분리수거 내역 확인</p>
                  <p class="subtitle">→</p>
                </article>
              </div>
            </div>
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
      //isActive: true,
      discharge: {
        amount: 0,
        score: 0,
      },
    };
  },
  methods: {
    changeClass(grade, classes) {
      this.$axios
        .get(
          `${process.env.VUE_APP_API_URL}/trash/recentDischarge?grade_class=${grade}-${classes}`
        )
        .then((res) => {
          console.log(res.data);
          this.discharge.amount = res.data.data.amount;
          this.discharge.score = res.data.data.score;
        });
      if (
        // 현재 경로와 선택한 경로가 다르면
        !(this.$router.currentRoute.query.grade_class == `${grade}-${classes}`)
      ) {
        this.$router.push(
          "/dashboard/class?grade_class=" + grade + "-" + classes
        );
      }
    },
  },
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