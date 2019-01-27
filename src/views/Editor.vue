<template>
    <my-page class="page-editor" :class="['mode-' + mode]" title="Markdown 编辑器" :page="page">
        <div class="editor-box">
            <pre id="code" class="ace_editor" style="height: 100%; min-height:500px"><textarea class="ace_text-input">
# Markdown Editor

> 一个简洁的在线 Markdown 编辑器

这是一段测试文本。

测试一下表格的显示效果：

| 水果        | 价格    | 数量  |
| --------    | :-----: | :----: |
| 香蕉        | $1      | 5    |
| 苹果        | $1      | 6    |
| 草莓        | $1      | 7    |

## 功能

* 方便的`导入导出`功能
    *  直接把一个markdown的文本文件拖放到当前这个页面就可以了
    *  导出为一个html格式的文件，样式一点也不会丢失
* 编辑和预览`同步滚动`，所见即所得（右上角设置）
* `VIM快捷键`支持，方便vim党们快速的操作 （右上角设置）
* 强大的`自定义CSS`功能，方便定制自己的展示
* 有数量也有质量的`主题`,编辑器和预览区域
* 完美兼容`Github`的markdown语法
* 预览区域`代码高亮`
* 所有选项自动记忆

## 二级标题

这是一段文本 `code`。

### 三级标题

这是内容

### 三级标题

**加粗**文字

```javascript
let person = {
    name: 'yunser',
    age: 18
}
```

```css
.code {
    color: '#f00'
    background: '#000'
}
```

I get 10 times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3].  

这是一个链接到谷歌的[^脚注]。

[^脚注]: http://www.google.com

[1]: http://google.com/        "Google" 
[2]: http://search.yahoo.com/  "Yahoo Search" 
[3]: http://search.msn.com/    "MSN Search"

            </textarea></pre>
        </div>
        <div class="preview-box">
            <ui-article v-html="html">
                <h2>二级标题</h2>
            </ui-article>
        </div>
        <div class="tool-box" v-if="toolVisible">
            <ui-appbar class="appbar" title="">
                <ui-icon-button icon="format_bold" slot="left" @click="bold" title="加粗（Ctrl + B）" />
                <ui-icon-button icon="format_italic" slot="left" @click="italic" title="加粗（Ctrl + I）" />
                <ui-icon-button icon="insert_link" slot="left" @click="insertLink" title="插入链接" />
                <ui-icon-button icon="format_quote" slot="left" @click="quote" title="引用（Ctrl + Q）" />
                <ui-icon-button icon="code" slot="left" @click="insertCode" title="代码块" />
                <ui-icon-button icon="insert_photo" slot="left" @click="insertPhoto" title="图片" />
                <ui-icon-button icon="format_list_bulleted" slot="left" @click="bulletedList" title="无序列表" />
                <ui-icon-button icon="format_list_numbered" slot="left" @click="numberedList" title="有序列表" />
                <ui-icon-button icon="title" slot="left" @click="insertTitle" title="标题" />
                <ui-icon-button icon="more_horiz" slot="left" @click="hr" title="水平分隔线" />
                <ui-icon-button icon="border_all" slot="left" @click="insertTable" title="表格" />
                <ui-icon-button icon="undo" slot="left" @click="undo" title="撤销" />
                <ui-icon-button icon="redo" slot="left" @click="redo" title="重做" />

                <ui-icon-button icon="close" slot="right" @click="toggleTool" />
            </ui-appbar>
        </div>
    </my-page>
</template>

<script>
    const ace = window.ace
    const marked = window.marked
    const Intent = window.Intent

    export default {
        data () {
            return {
                mode: 'editor',
                html: '',
                toolVisible: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'build',
                            click: this.toggleTool,
                            title: '切换工具栏'
                        },
                        {
                            type: 'icon',
                            icon: 'view_quilt',
                            click: this.toggleMode,
                            title: '切换布局'
                        },
                        {
                            type: 'icon',
                            icon: 'all_inclusive',
                            click: this.link,
                            title: '用其他应用打开'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/?utm_source=mdeditor',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        destroyed() {
            console.log('销毁', this._onKeyDown)
            document.removeEventListener('keydown', this._onKeyDown)
        },
        methods: {
            toggleTool() {
                this.toolVisible = !this.toolVisible
            },
            initKeyEvent() {
                console.log('初始化232222')
                document.addEventListener('keyup', this._onKeyDown = e => {
                    return this.keydown(e)
                }, false)
            },
            keydown(e) {
                this.alignTable()
                console.log(e)
                console.log(e.keyCode)
                switch (e.keyCode) {
                    case 13: // enter
                        if (e.ctrlKey && e.shiftKey) {
                            e.preventDefault()
                            this.editor.focus()
                            return false
                        }
                        break
                    case 49: // 1
                    case 50: // 2
                    case 51: // 3
                    case 52: // 4
                    case 53: // 5
                    case 54: // 5
                        if (e.ctrlKey) {
                            e.preventDefault()
                            let num = e.keyCode - 48
                            let text = ''
                            for (let i = 0; i < num; i++) {
                                text += '#'
                            }
                            this.editor.insert(text + ' ')
                            console.log(this.editor)
                            return false
                        }
                        break
                    case 66: // b
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.bold()
                            return false
                        }
                        break
                    case 71: // g
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.editor.insertSnippet('!()[${1:$SELECTION}]')
                            this.editor.renderer.scrollCursorIntoView()
                            return false
                        }
                        break
                    case 73: // i
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.italic()
                            return false
                        }
                        break
                    case 75: // k
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.insertCode()
                            return false
                        }
                        break
                    case 76: // l
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.insertLink()
                            return false
                        }
                        break
                    case 77: // m
                        if (e.ctrlKey) {
                            e.preventDefault()
                            // this.editor.selection.moveCursorToPosition({row: 4, column: 2})
                            let session = this.editor.getSession()
                            console.log('session', session)
                            let cursor = this.editor.selection.getCursor()
                            console.log('cursor', cursor)
                            let line = session.getLine(cursor.row)
                            console.log('line', line)
                            // this.editor.selection.selectLine()
                            // 把焦点移到内容的最后面
                            // let count = session.getLength()
                            // console.log('长度', count)
                            // this.editor.gotoLine(count, session.getLine(count - 1).length)
                            return false
                        }
                        break
                    case 81: // q
                        if (e.ctrlKey) {
                            e.preventDefault()
                            this.editor.insertSnippet('\n> ${1:$SELECTION}\n')
                            this.editor.renderer.scrollCursorIntoView()
                            return false
                        }
                        break
                    case 84: // t
                        if (e.ctrlKey && e.altKey) {
                            e.preventDefault()
                            let text = '| Col1      |     Col2 |   Col3   |\n| :-------- | --------:| :------: |\n| field1    |   field2 |  field3  |\n'
                            this.editor.insertSnippet(text)
                            this.editor.renderer.scrollCursorIntoView()
                            return false
                        }
                        break
                }
            },
            bold() {
                this.editor.insertSnippet(' **${1:$SELECTION}** ')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            italic() {
                this.editor.insertSnippet(' *${1:$SELECTION}* ')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            hr() {
                this.editor.insertSnippet('\n----------\n\n')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            quote() {
                this.editor.insertSnippet('\n> ${1:$SELECTION}\n')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            bulletedList() {
                this.editor.insertSnippet('* ${1:$SELECTION}')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            numberedList() {
                this.editor.insertSnippet('1. ${1:$SELECTION}')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            insertPhoto() {
                this.editor.insertSnippet('(${1:$SELECTION})[]')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            insertLink() {
                this.editor.insertSnippet('(${1:$SELECTION})[]')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            insertCode() {
                this.editor.insertSnippet('\n```${1:$SELECTION}\n```\n')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            insertTable() {
                let text = '| Col1      |     Col2 |   Col3   |\n| :-------- | --------:| :------: |\n| field1    |   field2 |  field3  |\n'
                this.editor.insertSnippet(text)
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            insertTitle() {
                this.editor.insertSnippet('## ')
                this.editor.renderer.scrollCursorIntoView()
                this.editor.focus()
            },
            undo() {
                this.editor.undo()
            },
            redo() {
                this.editor.redo()
            },
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
                    if (this.changeBreak) {
                        this.changeBreak = false
                        return
                    }
                    // align table
                    this.html = marked(this.editor.getValue(), {
                        gfm: true
                    })
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
                this.initKeyEvent()
            },
            initWebIntents() {
                if (!window.intent) {
                    return
                }
                console.log(window.intent.data)
                let data = window.intent.data
                this.editor.setValue(data)
                let extras = window.intent.action.extras
                if (extras && extras.fileName) {
                    this.fileName = extras.fileName
                }
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
            alignTable() {
                // this.editor.selection.moveCursorToPosition({row: 4, column: 2})
                let session = this.editor.getSession()
                console.log('session', session)
                let cursor = this.editor.selection.getCursor()
                console.log('cursor', cursor)
                let curLineText = session.getLine(cursor.row)
                if (!curLineText.match(/^\|/)) {
                    return
                }
                console.log('是表格')
                let lines = []
                let lineIndex = cursor.row
                while (true) {
                    let line = session.getLine(lineIndex)
                    if (line.match(/^\|/)) {
                        lines.push({
                            line: lineIndex,
                            text: line
                        })
                        lineIndex++
                    } else {
                        break
                    }
                }
                lineIndex = cursor.row - 1
                while (true) {
                    let line = session.getLine(lineIndex)
                    if (line.match(/^\|/)) {
                        lines.unshift({
                            line: lineIndex,
                            text: line
                        })
                        lineIndex--
                    } else {
                        break
                    }
                }
                console.log(lines)

                function tableRow2Arr(text) {
                    text = text.match(/\|([\w\W]+)\|/)[1]
                    let arr = text.split('|')
                    console.log('生成数组', arr)
                    arr = arr.filter(item => item.length) // TODO 奇怪了
                    arr = arr.map(item => {
                        return item.replace(/^\s*/, '')
                        // .replace(/\s*$/, '')
                    })
                    return arr
                }

                function setLineText(row, text) {
                    var Range = ace.require('ace/range').Range
                    let line = session.getLine(row)
                    console.log(row, 0, row, line.length - 1)
                    let range = new Range(row, 0, row, line.length)
                    session.replace(range, text)
                }

                function getLength(str) {
                    let count = 0
                    for (let i = 0; i < str.length; i++) {
                        if (str[i].match(/[\u4E00-\u9FA5]/)) {
                            count += 2
                        } else {
                            count++
                        }
                    }
                    return count
                }
                if (cursor.row !== lines[0].line) {
                    console.log('不是第一行', lineIndex, lines[0].line)
                    return
                }
                function paddingText(str1, str2) {
                    // let length1 = getLength(str1)
                    let length2 = getLength(str2)
                    let notBlankStr = str1.replace(/^\s*/, '').replace(/\s*$/, '')
                    let notBlankStrLength = getLength(notBlankStr)
                    let newLength
                    if (notBlankStrLength > length2) {
                        newLength = notBlankStrLength
                    } else {
                        newLength = length2
                    }
                    let num = newLength - notBlankStrLength
                    console.log('最终' + notBlankStr + '长度' + newLength)
                    for (let i = 0; i < num; i++) {
                        notBlankStr += ' '
                    }
                    return notBlankStr
                }

                let arr = tableRow2Arr(curLineText)
                console.log(arr)
                for (let idx = 0; idx < lines.length; idx++) {
                    let item = lines[idx]
                    if (item.line === lineIndex) {
                        continue
                    }
                    let newText = ''
                    let arr2 = tableRow2Arr(item.text)
                    console.log('数组', arr2)
                    for (let i = 0; i < arr2.length; i++) {
                        arr2[i] = ' ' + paddingText(arr2[i], arr[i])
                    }
                    newText = arr2.join('|')
                    newText = '|' + newText + '|'
                    this.changeBreak = true
                    setLineText(item.line, newText)
                }
                // this.editor.selection.selectLine()
                // 把焦点移到内容的最后面
                // let count = session.getLength()
                // console.log('长度', count)
                // this.editor.gotoLine(count, session.getLine(count - 1).length)
            },
            link() {
                let intent = new Intent({
                    action: 'http://webintent.yunser.com/?',
                    type: 'text/plain',
                    data: this.editor.getValue(),
                    extras: {
                        fileName: this.fileName || 'yunser.com-' + new Date().getTime() + '.md'
                    }
                })
                navigator.startActivity(intent, (data, extras) => {
                    console.log('成功1', data, extras)
                    this.editor.setValue(data)
                    if (extras && extras.fileName) {
                        this.fileName = extras.fileName
                    }
                }, data => {
                    console.log('失败')
                })
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
            },
            toggleMode() {
                this.mode = this.mode === 'preview' ? 'editor' : 'preview'
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
