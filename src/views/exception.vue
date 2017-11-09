<style src="../less/public.less" lang="less"></style>
<template>
    <div>
        <Form class="form-inline" ref="formInline" :model="formInline" inline>
            <Row>
                <Col span="4">
                    <Form-item label="异常类型" prop="type">
                        <Select v-model="formInline.type" placeholder="请选择异常类型">
                            <Option :value="key" :key="value" v-for="(value, key) in typeList">{{ value }}</Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col span="4">
                    <Form-item label="运次号" prop="way_no">
                        <Input type="text" v-model="formInline.way_no" placeholder="请填写运次号"></Input>
                    </Form-item>
                </Col>
                <Col span="4">
                    <Form-item label="车牌号" prop="car_no">
                        <Input type="text" v-model="formInline.car_no" placeholder="请填写车牌号"></Input>
                    </Form-item>
                </Col>
                <Col span="4">
                    <Form-item label="反馈人" prop="creater">
                        <Input type="text" v-model="formInline.creater" placeholder="请填写反馈人"></Input>
                    </Form-item>
                </Col>
                <Col span="4">
                    <Form-item label="司机号码" prop="driver_mobile_no">
                        <Input type="text" v-model="formInline.driver_mobile_no" placeholder="请填写司机号码"></Input>
                    </Form-item>
                </Col>
                <Col span="4">
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
                        <Button type="ghost" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
                    </Form-item>
                </Col>
            </Row>
            <!-- <Form-item label="异常类型" prop="type">
                <Select v-model="formInline.type" placeholder="请选择异常类型">
                    <Option :value="key" :key="value" v-for="(value, key) in typeList">{{ value }}</Option>
                </Select>
            </Form-item>
            <Form-item label="运次号" prop="way_no">
                <Input type="text" v-model="formInline.way_no" placeholder="请填写运次号"></Input>
            </Form-item>
            <Form-item label="车牌号" prop="car_no">
                <Input type="text" v-model="formInline.car_no" placeholder="请填写车牌号"></Input>
            </Form-item>
            <Form-item label="反馈人" prop="creater">
                <Input type="text" v-model="formInline.creater" placeholder="请填写反馈人"></Input>
            </Form-item>
            <Form-item label="司机号码" prop="driver_mobile_no">
                <Input type="text" v-model="formInline.driver_mobile_no" placeholder="请填写司机号码"></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
                <Button type="ghost" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
            </Form-item> -->
        </Form>

        <Button-group class="fun-btns" size="small">
            <Button type="primary" @click="modal.show = true">
                <Icon type="plus"></Icon>
                新增
            </Button>
        </Button-group>

        <Table stripe border ellipsis :columns="columns1" size="small" :data="data1" class="common-table"></Table>
        <div style="margin-top: 10px;">
            <Page 
                show-elevator 
                show-sizer 
                :total="totalPage" 
                :current="1" 
                placement="top" 
                size="small" 
                :page-size = "formInline.rows"
                :page-size-opts = "[2, 3, 4]" 
                @on-change="changePage">
            </Page>
        </div>
        
        <!-- 弹层 -->
        <Modal
            v-model="modal.show"
            title="新增异常"
            :loading="modal.loading"
            width="800"
            @on-ok="asyncOK">
            <Form ref="modal.exceptionData" :model="modal" :rules="modal.exceptionRules" :label-width="90">
                <Row :gutter="16">
                    <Col span="8">
                        <Form-item label="运行单号" prop="run_num">
                            <Input 
                                v-model="modal.run_num" 
                                placeholder="请输入" 
                                size="small"
                                autofocus
                                @on-enter="waybillSerh" style="width:110px;">
                            </Input>
                            <Button type="primary" size="small" @click="waybillSerh">搜索</Button>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="异常类型">
                            <Select v-model="modal.exceptionData.type" value="01" size="small">
                                <Option :value="key" :key="value" v-for="(value, key) in typeList">{{ value }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="异常处理状态">
                            <Input v-model="modal.exceptionData.exce_status" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <Form-item label="用车日期">
                            <Input v-model="modal.exceptionData.use_date" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="干线类型">
                            <Input v-model="modal.exceptionData.lineTypeDicName" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="车型">
                            <Input v-model="modal.exceptionData.car_type_dic" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <Form-item label="车牌号">
                            <Input v-model="modal.exceptionData.car_no" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="司机">
                            <Input v-model="modal.exceptionData.driver_name" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="司机手机">
                            <Input v-model="modal.exceptionData.driver_mobile_no" placeholder="请输入" size="small" readonly></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import axios from 'axios';
    import Qs from 'qs';
    export default {

        data () {
            return {
                formInline: {
                    type: '',
                    way_no: '',
                    car_no: '',
                    creater: '',
                    driver_mobile_no: '',
                    page:1,
                    rows:2
                },
                totalPage: 1,
                typeList: '',
                columns1: [
                    { title: '运行单号',  key: 'run_num', width: 110 },
                    { title: '异常类型', key: 'typeName' , width: 100},
                    { title: '异常状态', key: 'exceStatusName' , width: 100, align: 'center'},
                    { title: '班次', key: 'class_no' , width: 80},
                    { title: '始发部门', key: 'startStationName' , width: 150},
                    { title: '终点部门', key: 'arrivalStationName' , width: 150},
                    { title: '发车时间', key: 'real_start_time' , width: 150},
                    { title: '到达时间', key: 'real_arrival_time' , width: 150},
                    { title: '车型', key: 'carTypeDicName' , width: 100},
                    { title: '用车日期', key: 'use_date' , width: 100},
                    { title: '车牌号', key: 'car_no' , width: 100},
                    { title: '司机', key: 'driver' , width: 100},
                    { title: '司机手机', key: 'driver_mobile_no' , width: 130},
                    { title: '反馈人', key: 'creater' , width: 130},
                    { title: '反馈时间', key: 'createDt' , width: 150},
                    { 
                        title: '异常描述', 
                        key: 'exce_desc' , 
                        width: 180,
                        render: (h, params) => {
                            return h('div', ['123', 
                                h('Poptip', {
                                    props: {
                                        width: '400',
                                        content: 'border'
                                    }
                                }, [h('Button', {
                                }, '修改')])

                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 210,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        icon: 'edit',
                                        size: 'small'
                                    },
                                    on: {
                                        click: (a)=> {
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        icon: 'trash-b',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=> {
                                            alert(1)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        icon: 'information-circled',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=> {
                                            alert(1)
                                        }
                                    }
                                }, '异常处理')
                            ]);
                        }
                    }
                ],
                data1: [],

                // 弹层
                modal: {
                    show: false,
                    loading: true,
                    run_num: '',
                    exceptionData: {
                       // runNum: runNum
                    },
                    exceptionRules: {
                        run_num: [
                            { required: true, message: '运行单号不能为空', trigger: 'blur' }
                        ]
                    }
                }
               
            }
        },
        created: function () {
            var _this = this;

            axios.get('/api/expType')
            .then(function (response) {
                _this.$data.typeList = response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });

            //let formData = _this.$data.formInline;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            /*axios.post('/tcs-web/api/tms/exception/loadException', formData)
            .then(function (response) {
                _this.$data.data1 = response.data.data.beanList;
                _this.$data.totalPage = response.data.data.totalPages;
            })
            .catch(function (error) {
                console.log(error);
            });
*/
            /*axios.get('/tcs-web/api/tms/exception/loadException', {
                params: formData
            })
            .then(function (response) {
                _this.$data.data1 = response.data.data.beanList;
                _this.$data.totalPage = response.data.data.dataSize;
            })
            .catch(function (error) {
                console.log(error);
            });*/

            
            this.getData();
        },
        beforeUpdate: function() {
        },
        computed: {
            
        },
        methods: {
            getData () {
                var _this = this;
                axios({
                    method: 'post',
                    url: '/api/getExp',
                    transformRequest: [function (data) {
                    　　data = Qs.stringify(data);
                        return data;
                    }],
                    data: this.$data.formInline
                })
                .then(function (response) {
                    _this.$data.data1 = response.data.data;
                    _this.$data.totalPage = response.data.data.dataSize;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.getData();
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            // 重置
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            changePage (name) {
                var _this = this;
                let formData = _this.$data.formInline;
                formData.page = name;
                axios({
                    method: 'post',
                    url: '/api/getExp',
                    params: formData
                })
                .then(function (response) {
                    _this.$data.data1 = response.data.data;
                    _this.$data.totalPage = response.data.data.dataSize;
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            },

            // 运单查询
            waybillSerh (a) {
                const _this = this;
                let run_num = _this.$data.modal.run_num;
                // var   exceptionData = _this.$data.modal.exceptionData;

                axios.get('/tcs-web/api/tms/exception/runNum', {
                    params: {
                      run_num: run_num
                    }
                })
                .then(function (response) {
                    if(response.data.success){
                        _this.$Message.success('加载成功');
                        _this.$data.modal.exceptionData = response.data.data
                    } else {
                        _this.$Message.warning(response.data.message);
                        _this.$data.modal.exceptionData = {};
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });         
            }


        }
    }
</script>