<template>
  <div class="home">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title is-size-4-mobile">이번 달 분리수거 점수 1등</p>
              <p class="subtitle">
                {{ firstClass.score.grade }} 학년 {{ firstClass.score.cl }} 반 /
                {{ trash.score }} 점
              </p>
            </article>
            <article
              class="tile is-child notification is-warning"
              style="padding: 20px"
            >
              <p class="title is-size-4-mobile">이번 달 쓰레기 배출량 1등</p>
              <p class="subtitle">
                <b-field
                  >{{ firstClass.score.grade }} 학년
                  {{ firstClass.score.cl }} 반</b-field
                >
                <b-field>
                  <b-progress
                    type="is-success"
                    :value="trash.amount * 100"
                    show-value
                    format="percent"
                /></b-field>
              </p>
            </article>
            <!--

            <article
              class="tile is-child notification is-info"
              v-on:click="$router.push('/class')"
            >
              <p class="title is-size-4-mobile">우리 반 분리수거 상태</p>
              <p class="subtitle">→</p>
            </article>

            -->
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
  name: "Home",
  created() {
    console.log(this.$store.getters.getGradeClass)
  },
  data() {
    return {
      firstClass: {
        score: {
          grade: 1,
          cl: 1,
        },
        amount: {
          grade: 1,
          cl: 2,
        },
      },
      trash: {
        score: 20,
        amount: 0.35,
      },
    };
  },
};
</script>
<style>
.tile {
  background: white;
}
</style>