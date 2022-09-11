<template>
  <nav>
    <ul>
      <li>
        <router-link to="/home">首页</router-link>
      </li>
      <li>
        <router-link to="/shop">购物</router-link>
      </li>
      <li>
        <div class="add" @click="$router.push('upload')"><span>+</span></div>
      </li>
      <li>
        <router-link to="/message">消息</router-link>
      </li>
      <li>
        <router-link to="/person">我</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
}
</script>

<style lang="less" scoped>
nav {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 0.16rem;
  background: white;

  ul {
    width: 100vw;
    padding: 0.1rem 0.05rem 0.1rem;
    display: flex;
    justify-content: space-between;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      .add {
        width: 0.4rem;
        height: 100%;
        background: rgb(255, 0, 0);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #fff;
          font-weight: bold;
          transform: scale(1.5);
        }
      }

      a {
        color: #aaa;
      }
    }

    .active {
      color: #000;
      font-size: 0.17rem;
      font-weight: bold;
    }
  }
}
</style>