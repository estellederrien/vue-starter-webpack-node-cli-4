<template>
<div class="hello" style="font-size:0.8em">
    <div class="col-lg-5 mx-auto  d-lg-block "><br>
        <div class="text-center">
            <img src="../assets/img/node.png" style="width:150px;height:100px;" />
            <img src="../assets/img/create-a-database-cluster-in-the-cloud-with-mongodb-atlas_2.jpg" style="width:100px;height:100px;" />
            <img src="../assets/img/vuejs.jpg" style="width:100px;height:100px;" />
        </div>
    </div>
    <div class="col-lg-5 mx-auto d-lg-block " style="margin-top:30px;max-width:850px">
          
		   <span v-html=" t('INTRO')" ></span>
    </div>
	<br>
    <p>
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
        .
    </p>
    <h4>Installed CLI Plugins</h4>
    <ul>
        <li>
            <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">
                babel
            </a>
        </li>
        <li>
            <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">
                router
            </a>
        </li>
        <li>
            <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">
                eslint
            </a>
        </li>
        <li>
            <a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">
                unit-mocha
            </a>
        </li>
    </ul>
    <h4>Essential Links</h4>
    <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li>
            <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
        </li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h4>Ecosystem</h4>
    <ul>
        <li>
            <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
        </li>
        <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
        <li>
            <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">
                vue-devtools
            </a>
        </li>
        <li>
            <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
        </li>
        <li>
            <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">
                awesome-vue
            </a>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data: () => ({}),
    name: "HelloWorld",
    props: {
        msg: String,
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
