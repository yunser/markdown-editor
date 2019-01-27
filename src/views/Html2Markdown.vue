<template>
    <my-page title="HTML 转 Markdown" :page="page">
        <textarea class="textarea" v-model="result" rows="10" placeholder="HTML"></textarea>
        <br>
        <ui-raised-button class="btn" primary label="转换" @click="html2md" />
        <br>
        <textarea class="textarea" v-model="code" rows="10" placeholder="Markdown" v-if="code"></textarea>
    </my-page>
</template>

<script>
    const toMarkdown = window.toMarkdown

    export default {
        data () {
            return {
                code: '',
                result: '',
                page: {
                    menu: [
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
                this.result = data
            },
            html2md() {
                var text = this.result
                if (!text) {
                    alert('请填写要解码的内容')
                    return
                }
                this.code = toMarkdown(text, {})
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
                window.intent.postResult(this.code)
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
