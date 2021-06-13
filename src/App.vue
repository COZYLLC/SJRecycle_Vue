<template>
  <div id="app">
    <navbar v-if="!$route.meta.isDashboard" />
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      v-if="$route.meta.isDashboard"
      @toggle-collapse="onToggleCollapse"
      theme="default-theme"
    >
      <span slot="toggle-icon">
        <vue-fontawesome
          :icon="collapsed ? ['fas', 'caret-right'] : ['fas', 'caret-left']"
        />
      </span>
    </sidebar-menu>
    <transition name="fade" mode="out-in">
      <router-view id="router" />
    </transition>
  </div>
</template>

<script>
import navbar from "@/components/navBar";
export default {
  components: {
    navbar,
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
  data() {
    return {
      collapsed: true,
      menu: [
        {
          header: true,
          title: "관리 도구",
          hiddenOnCollapse: true,
        },
        {
          href: "/dashboard",
          title: "한눈에 보기",
          icon: {
            element: "vue-fontawesome",
            attributes: {
              icon: ["fas", "info"],
            },
          },
        },
        {
          href: "/dashboard/class",
          title: "학급 관리",
          icon: {
            element: "vue-fontawesome",
            attributes: {
              icon: ["fas", "school"],
            },
          },
        },
        {
          href: "/dashboard/question",
          title: "질문지 관리",
          icon: {
            element: "vue-fontawesome",
            attributes: {
              icon: ["fas", "question"],
            },
          },
        },
                {
          href: "/dashboard/dc_record",
          title: "분리배출 현황",
          icon: {
            element: "vue-fontawesome",
            attributes: {
              icon: ["fas", "recycle"],
            },
          },
        },
      ],
      themes: [
        {
          name: "Default theme",
          input: "",
        },
        {
          name: "White theme",
          input: "white-theme",
        },
      ],
    };
  },
};
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
* {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}

#router {
  background: white;
}

#cl {
  padding-top: 0;
}

#app {
  background-color: #f4f4f4;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  text-align: center;
}

#router {
  padding: 20px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
