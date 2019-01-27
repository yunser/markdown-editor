<template>
    <my-page title="Markdown 转 HTML" :page="page">
        <textarea class="textarea" v-model="code" rows="10" placeholder="Markdown"></textarea>
        <br>
        <ui-raised-button class="btn" primary label="转换" @click="encode" />
        <br>
        <textarea class="textarea" v-model="result" rows="10" placeholder="HTML" v-if="result"></textarea>
    </my-page>
</template>

<script>
    const marked = window.marked

    export default {
        data () {
            return {
                code: '',
                result: '',
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     to: '/help'
                        // }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.initWebIntents()
            },
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                let data = window.intent.data
                this.code = data
            },
            encode() {
                var text = this.code
                if (!text) {
                    alert('请输入 Markdown')
                    return
                }
                // var rendererMD = new marked.Renderer()
                var renderer = new marked.Renderer()
                renderer.heading = (text, level) => {
                    // var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
                    return '<h' + level + '>' + text + '</h' + level + '>\n'
                }
                marked.setOptions({
                    renderer: renderer
                    // renderer: rendererMD,
                    // gfm: true,
                    // tables: true,
                    // breaks: false,
                    // pedantic: false,
                    // sanitize: false,
                    // smartLists: true,
                    // smartypants: false
                })
                this.result = marked(text)
                if (window.intent && !this.isAddMenu) {
                    this.isAddMenu = true
                    this.page.menu.push({
                        type: 'icon',
                        icon: 'check',
                        click: this.finish,
                        title: '完成'
                    })
                }
            },
            finish() {
                window.intent.postResult(this.result)
                setTimeout(() => {
                    let owner = window.opener || window.parent
                    owner.window.close()
                }, 100)
            }
        }
    }
</script>

<style scoped>
.textarea {
    width: 100%;
    max-width: 400px;
    padding: 16px;
    margin-bottom: 16px;
}
.btn {
    margin-bottom: 16px;
}
</style>
