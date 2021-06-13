<template>
  <div>
    <h1 class="title is-2">인증</h1>
    <p>검사할 반의 인증번호를 입력해주세요.</p>
    <b-field style="margin-top: 1.8vh">
      <input
        id="codeInput"
        type="text"
        v-touppercase
        v-model="code"
        maxlength="6"
      />
    </b-field>
    <b-button
      type="is-success"
      style="float: right; width: 25vw; border-radius: 38px"
      @click="submit"
      >확인</b-button
    >
  </div>
</template>
<style>
#codeInput {
  width: 100%;
  height: 4vh;
  border-radius: 38px;
  border-color: black;
  padding: 8px;
}

input:focus {
  outline: none;
}
</style>
<script>
import { SnackbarProgrammatic as Snackbar } from "buefy";
import crypto from "crypto";
export default {
  data() {
    return {
      code: "",
    };
  },
  methods: {
    submit() {
      const data = {
        password: crypto.createHash("sha256").update(this.code.toUpperCase()).digest("base64"),
      };
      this.$axios
        .post(`${process.env.VUE_APP_API_URL}/login`, data)
        .then((res) => {
          if (res.data.reqSuccess && res.data.loginSuccess) {
            console.log(res.data.grade_class)
            this.$store
              .dispatch("loginA", res.data.grade_class)
              .then(() => {
                Snackbar.open({
                  message: "인증에 성공하였습니다!",
                  type: "is-success",
                });
                this.$router.push("/");
              });
          } else {
            Snackbar.open({
              message: "인증에 실패했습니다",
              type: "is-danger",
            });
            this.code = "";
          }
        })
        .catch((e) => {
          console.log(e);
          Snackbar.open({
            message: "인증에 실패했습니다: " + e.message,
            type: "is-danger",
          });
          this.code = "";
        });
    },
  },
};
</script>