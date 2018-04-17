<template>
    <my-page class="page-editor" title="Markdown 编辑器" :page="page">
        <div class="editor-box">
            <pre id="code" class="ace_editor" style="height100%; min-height:500px"><textarea class="ace_text-input">
## 二级标题
> 引用

这是内容
### 三级标题
**加粗**文字
            </textarea></pre>
        </div>
        <div class="preview-box">
            <ui-article v-html="html">
                <h2>二级标题</h2>
            </ui-article>
        </div>
    </my-page>
</template>

<script>
    const ace = window.ace
    const saveAs = window.saveAs
    const marked = window.marked

    export default {
        data () {
            return {
                html: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'file_download',
                            click: this.download,
                            title: '下载'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                // 初始化对象
                let editor = ace.edit('code')
                this.editor = editor

                // 设置风格和语言（更多风格和语言，请到github上相应目录查看）
                let theme = 'clouds'
                let language = 'markdown'
                editor.setTheme('ace/theme/' + theme)
                editor.session.setMode('ace/mode/' + language)

                // 字体大小
                editor.setFontSize(18)

                // 设置只读（true时只读，用于展示代码）
                editor.setReadOnly(false)

                // 自动换行,设置为off关闭
                editor.setOption('wrap', 'free')

                // 启用提示菜单
                ace.require('ace/ext/language_tools')
                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                })

                editor.getSession().setUseSoftTabs(true)
                editor.getSession().on('change', e => {
                    console.log('change')
                    this.html = marked(this.editor.getValue())
                    // this.html = this.editor.getValue()
                })
                this.html = marked(this.editor.getValue())
                editor.find('标题', {
                    backwards: false,
                    wrap: false,
                    caseSensitive: false,
                    wholeWord: false,
                    regExp: false
                })

                console.log(editor)
                // text parameter support
                let text = this.$route.query.text
                if (text) {
                    this.editor.setValue(text)
                }
                // url parameter support
                let url = this.$route.query.url
                if (url) {
                    this.loadTextFromUrl(url)
                }
                this.initWebIntents()

//                $('#new').on('click', function () {
//                    editor.setValue('')
//                })
//
//                $('#open').on('click', function () {
//                    $('#file').click()
//                })
//
//
//                $('#file').on('change', function (e) {
//                    e.preventDefault()
//
//                    var files = [].slice.call(e.originalEvent.target.files)
//                    var file = files[0]
//
//                    var reader = new FileReader()
//                    reader.onload = (function(theFile) {
//                        return function(e) {
//                            var doc = e.target.result
//
//                            editor.setValue(doc)
//                        }
//                    })(file)
//                    reader.readAsText(file)
//                    $('#file').click()
//                })
            },
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                console.log(window.intent.data)
                let data = window.intent.data
                this.editor.setValue(data)

                this.page.menu.push({
                    type: 'icon',
                    icon: 'check',
                    click: this.finish,
                    title: '完成'
                })
            },
            finish() {
                window.intent.postResult(this.editor.getValue())
                setTimeout(() => {
                    let owner = window.opener || window.parent
                    owner.window.close()
                }, 100)
            },
            download() {
                let blob = new Blob([this.editor.getValue()], {type: 'text/plain;charset=utf-8'})
                saveAs(blob, 'yunser.com-' + new Date().getTime() + '.md')
            },
            loadTextFromUrl(url) {
                this.$http.get(url).then(
                    response => {
                        let data = response.data
                        if (/\.md$/.test(url)) {
                            console.log('markdown')
                            this.isMarkdown = true
                            this.content = marked(data)
                        } else {
                            this.content = data
                        }
                    },
                    response => {
                        console.log(response)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.ace-editor {
    height: 100%;
    min-height: 500px;
    font-size: 18px
}
</style>
