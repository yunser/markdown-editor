<template>
    <my-page title="格式" :page="page">
        <app-list :data="groups" />
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
                                to: '/editor'
                            },
                        ]
                    },
                    {
                        name: '其他',
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
