<template>
  <div style="padding: 0; width: 100vw">
    <navBar style="margin-left: 50px" />
    <b-modal v-model="notCertificated" :width="640" :can-cancel="false">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <section>
              <h1 class="title is-4 centered" style="text-align: center">
                관리자 코드 입력
              </h1>
              <b-field>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>관리자용 코드를 입력해주세요.</p>
                    <b-input type="text" v-model="code"></b-input>
                  </div>
                </section>
              </b-field>
            </section>
            <b-button
              type="is-success"
              style="width: 100%; margin-top: 10px"
              v-on:click="check"
              >확인</b-button
            >
          </div>
        </div>
      </div>
    </b-modal>
    <router-view
      v-if="!notCertificated"
      style="padding: 20px; margin-left: 50px"
    ></router-view>
  </div>
</template>

<style>
</style>
<script>
import navBar from "@/components/navBar.vue";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      notCertificated: true,
      code: "",
    };
  },
  methods: {
    check(){
      if (this.code == process.env.VUE_APP_ADMIN_KEY) {
        this.notCertificated = false
      }
    }
  }
};
</script>