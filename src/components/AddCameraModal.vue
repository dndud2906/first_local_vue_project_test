<template>
    <a-modal 
        title="Add Camera"
        v-model="isActive" 
        @cancel="addCancelClick"
        :width=800 :footer="null"
    >
        <template>
            <div>
                <div>
                    <div>
                        <a-form :layout="formLayout" :form="form" @submit="handleSubmit">                
                            <a-form-item label="NAME" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:10}">
                                <a-input
                                    v-decorator="['cName', { rules: [{ required: true }] }]"
                                />
                            </a-form-item>          
                            <a-form-item  label="LABEL" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                <a-input
                                    v-decorator="['label', { rules: [{ required: true }] }]"
                                />
                            </a-form-item>
                            <!-- -->
                            <a-form-item  label="DESCRIPTION" :colon="false" :style="{'width':'100%'}" :wrapper-col="{span:19}"  :label-col="{span:5}">
                                <a-input 
                                    v-decorator="['description', { rules: [{ required: false }] }]"
                                />
                            </a-form-item>
                                    
                            <!-- -->
                            <a-form-item :colon="false" :wrapper-col="{span:14}"  :label-col="{span:10}">
                                <span slot="label">
                                    BIT RATE&nbsp;
                                    <a-tooltip title="bit rate">
                                        <a-icon type="question-circle-o" />
                                    </a-tooltip>
                                </span>
                                <a-input
                                    v-decorator="['bitRate', { rules: [{ required: false }] }]"
                                />
                            </a-form-item>
                            <a-form-item :colon="false" :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                <span slot="label">
                                    CODEC&nbsp;
                                    <a-tooltip title="codec">
                                        <a-icon type="question-circle-o" />
                                    </a-tooltip>
                                </span>
                                <a-input
                                    v-decorator="['codec', { rules: [{ required: false }] }]"
                                />
                            </a-form-item>
                            
                            <!-- -->
                            <a-form-item label="OBJECT TYPE" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:10}">
                                <a-input
                                    v-decorator="['objType', { initialValue:'camera', rules: [{ required: true }] }]"
                                />
                            </a-form-item>          
                            <a-form-item  label="RTSP URI" :colon="false"  :wrapper-col="{span:14}" :label-col="{span:9, offset:1}">
                                <a-input
                                    v-decorator="['rtspURI', { rules: [{ required: true }] }]"
                                />
                            </a-form-item>
                            <!-- -->
                            <a-form-item label="RTSP ID" :colon="false" :wrapper-col="{span:14}"  :label-col="{span:10}">
                                <a-input
                                    v-decorator="['rtspID', { rules: [{ required: false }] }]"
                                />
                            </a-form-item>
                            <a-form-item  label="RTSP PW" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                <a-input-password
                                    v-decorator="['rtspPW', { rules: [{ required: false }] }]"
                                />
                            </a-form-item>
                            
                            
                            
                            <!-- -->
                            <a-collapse  :bordered="false">
                                <a-collapse-panel header="Additional Options" key="1" class="test">
                                    <!-- -->
                                    <a-form-item label="LATITUDE" :colon="false" :wrapper-col="{span:14}"  :label-col="{span:10}">
                                    <a-input
                                        v-decorator="['latitude', { rules: [{ required: false }] }]"
                                    />
                                    </a-form-item>
                                    <a-form-item  label="LONGITUDE" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                        <a-input
                                            v-decorator="['longitude', { rules: [{ required: false }] }]"
                                        />
                                    </a-form-item> 

                                    <!-- -->
                                    <a-form-item label="Use PTZ" :colon="false" :style="{'width':'35.5%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-select default-value="1">
                                            <a-select-option value="1">
                                                False
                                            </a-select-option>
                                            <a-select-option value="2">
                                                True
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="PTZ Driver" :colon="false" :style="{'width':'32.5%'}" :label-col="{span:12}" :wrapper-col="{span:12}">
                                        <a-select >
                                            <a-select-option value="1">
                                                ciscovsm7
                                            </a-select-option>
                                            <a-select-option value="2">
                                                milestone
                                            </a-select-option>
                                            <a-select-option value="3">
                                                honeywell
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="Use RDS" :colon="false" :style="{'width':'32%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-select default-value="1">
                                            <a-select-option value="1">
                                                No
                                            </a-select-option>
                                            <a-select-option value="2">
                                                S/W
                                            </a-select-option>
                                            <a-select-option value="3">
                                                H/W
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>

                                    <!-- -->
                                    <a-form-item label="MEDIA SERVER" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:10}">
                                        <a-select >
                                            
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="CONNECT MODE" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                        <a-select default-value="1" >
                                            <a-select-option value="1">
                                                UDP
                                            </a-select-option>
                                            <a-select-option value="2">
                                                TCP
                                            </a-select-option>
                                            <a-select-option value="3">
                                                Multi CAST
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <!-- -->
                                    <a-form-item label="WIDTH" :colon="false" :style="{'width':'35.5%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-input
                                            v-decorator="['width', { rules: [{ required: false }] }]"
                                        />
                                    </a-form-item>
                                    <a-form-item label="HEIGHT" :colon="false" :style="{'width':'32.5%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-input
                                            v-decorator="['height', { rules: [{ required: false }] }]"
                                        />
                                    </a-form-item>
                                    <a-form-item label="FPS" :colon="false" :style="{'width':'32%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-input 
                                            v-decorator="['fps', { initialValue:0, rules: [{ required: false }] }]"
                                        />
                                    </a-form-item>

                                    <!-- -->
                                    <a-form-item label="RECORD SERVER" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:10}">
                                        <a-select >
                                            
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="RECORD STORAGE" :colon="false"  :wrapper-col="{span:14}"  :label-col="{span:9, offset:1}">
                                        <a-select >
                                            
                                        </a-select>
                                    </a-form-item>

                                <!-- -->
                                    <a-form-item label="RECORD CAM NUM" :colon="false" :style="{'width':'35.5%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-input
                                            :disabled="true"
                                            v-decorator="['rcNum',{rules:[{required:false}] }]"
                                        />
                                    </a-form-item>
                                    <a-form-item label="RETENT PERIOD" :colon="false" :style="{'width':'32.5%'}" :label-col="{span:17}" :wrapper-col="{span:7}">
                                        <a-input
                                            v-decorator="['period',{initialValue:7,rules:[{required:false}] }]"
                                        />
                                    </a-form-item>
                                    <a-form-item label="RECORD TYPE" :colon="false" :style="{'width':'32%'}" :label-col="{span:14}" :wrapper-col="{span:10}">
                                        <a-select >
                                            <a-select-option value="1">
                                                Always
                                            </a-select-option>
                                            <a-select-option value="2">
                                                Never
                                            </a-select-option>
                                            <a-select-option value="3">
                                                Schedule
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-collapse-panel>
                            </a-collapse>
                            <!-- -->
                            <a-form-item :style="{marginLeft:'38%'}">
                                <a-button class="btnStyle" @click="addCancelClick">Cancel</a-button>
                                <a-button  type="primary" html-type="submit" class="btnStyle">
                                    Save
                                </a-button>  
                            </a-form-item>        
                        </a-form>
                    </div>    
                </div>
            </div>
        </template>
    </a-modal>
</template>

<script>
import { addCamera } from '../repository'
export default {
    name: 'AddCameraModal',
    props: ['addModalVisible'],
    data(){
        return{
            formLayout:"inline",
            form: this.$form.createForm(this, {name:'CameraAddWindow'}),
            isActive:this.addModalVisible,
        }
    },
    methods:{
        addCancelClick(){
            this.form.resetFields();
            this.isActive=false;
            this.$emit("setVisible","add", this.isActive)
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
            if (!err) {         
                console.log('Received values of form: ', values);
                addCamera(values)
                    .then(data => {
                        this.form.resetFields();
                        this.isActive=false;
                        this.$emit('addCamera', data.camera);
                        this.$emit('setVisible', "add", this.isActive);
                    })
                    .catch(err => alert(err.message));
            }
        });   
      },
    },
}
</script>

<style lang="scss">
    .btnStyle1{
        margin-left: 15px;
    }

    .btnStyle2{
        margin-left: 5px;
    }

    .ant-form-inline .ant-form-item{
    margin-right:0px;
    }

    .ant-form-item {
        width:50%;
    }

    .ant-collapse-item:last-child{
        border-bottom:none;
    }

    .btnStyle{
        margin-right: 12px;
        font-weight: bold;
    }
    .ant-collapse-content .ant-collapse-content-box{
        padding-right:0px;
        padding-left:0px;
    }
</style>