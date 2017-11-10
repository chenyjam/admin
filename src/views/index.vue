<style scoped>
    .layout{
        height: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
        display: inline-block;
    }
    .layout-content{
        min-height: 200px;
        padding: 15px;
        overflow-x: hidden;
        overflow-y: scroll;
        background: #fff;
        border-radius: 4px;
        position: absolute;
        right: 0;
        left: 200px;
        bottom: 0;
        top: 50px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-right {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-left: 200px;
    }
    .layout-menu-left{
        position: absolute;
        width: 200px;
        height: 100%;
        background: #464c5b;
    }
    .layout-header{
        height: auto;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu theme="dark" :active-name="activeName" :open-names="openName" width="auto" @on-select="menuSelect" accordion>
                    <Submenu :name="item.href" :key="item" v-for="(item,index) in menu">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            {{ item.title }}
                        </template>
                        <Menu-item :name="subitem.href" :key="subitem" v-for="subitem in item.submenu">{{ subitem.title }}</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="layout-right">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <div class="layout-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb-item href="#">首页</Breadcrumb-item>
                            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                            <Breadcrumb-item>某应用</Breadcrumb-item>
                        </Breadcrumb>
                    </div>
                </div>
                
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import menus from '../menus'
import axios from 'axios';
    export default {
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                menu: menus
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 3 ? 14 : 24;
            },
            activeName () {
                return this.$route.path === '/' 
                        ? menus[0].submenu[0].href 
                        : this.$route.path;
            },
            openName () {
                return this.$route.matched[0].path === '' 
                        ? [menus[0].href] 
                        : [this.$route.matched[0].path];
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            menuSelect (name) {
                return this.$router.push(name)
            }
        }
    }
</script>