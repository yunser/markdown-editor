<template>
    <my-page title="Markdown 转 JSON" :page="page">
        <div class="common-container">
            <textarea class="textarea" v-model="code" rows="10" placeholder="Markdown"></textarea>
            <br>
            <ui-raised-button class="btn" primary label="转换" @click="encode" />
            <br>
            <textarea class="textarea" v-model="result" rows="10" placeholder="HTML" v-if="result"></textarea>
        </div>
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
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/5e1222e0e7c211eabd36bd87ff5eff33',
                            target: '_blank'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
            // this.debug()
        },
        methods: {
            debug() {
                this.code = `# 一级标题
## 二级标题

这是段落。

第二段

* 列表项1
* 列表项2
`
            },
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
                const result = marked.lexer(text)
                console.log('result', result)
                this.result = JSON.stringify(result, null, 4)
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
