<template>
    <my-page title="Markdown" :page="page">
        <div class="common-container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '基本',
                        apps: [
                            {
                                name: '编辑器',
                                desc: '',
                                icon: '/static/img/markdown.svg',
                                to: '/editor',
                                target: '_blank',
                            },
                        ]
                    },
                    {
                        name: '转换',
                        apps: [
                            {
                                name: 'HTML 转 MD',
                                desc: 'HTML 转 Markdown',
                                icon: '/static/img/markdown.svg',
                                to: '/html2markdown'
                            },
                            {
                                name: 'MD 转 HTML',
                                desc: 'Markdown 转 HTML',
                                icon: '/static/img/markdown.svg',
                                to: '/markdown2html'
                            },
                            {
                                name: 'MD 转 JSON',
                                desc: 'Markdown 转 JSON',
                                icon: '/static/img/markdown.svg',
                                to: '/markdown2json'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=markdown',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=markdown',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>
