<template>
    <div><br />
        <a-input-group compact>
            <a-select defaultValue="type" @change="handleChange">
                <a-select-option value="cName">NAME</a-select-option>
                <a-select-option value="label">LABEL</a-select-option>
                <a-select-option value="rtspURI">RTSP</a-select-option>
            </a-select>
            <a-input-search placeholder="Search.." @search="onSearch"/>
        </a-input-group>
        
        <a-icon type="menu-unfold" :class="{'fontStyle':true}" />
        <span :class="{'fontStyle':true}">{{cameras.length}}</span>
        <a-tooltip>
            <template slot="title">
                Reload
            </template>
            <a-button icon="reload" :class="{'btnMargin10':true}"></a-button>
        </a-tooltip>

        <a-button type="primary" :class="{'btnMargin10':true,'btnStyle':true}" @click="() => this.addModalVisible=true" ghost>Add</a-button>
        <a-button type="danger" :class="{'btnMargin5':true,'btnStyle':true}" @click="() => this.removeVisible=true" ghost>Remove</a-button>
        <a-modal
            title="Warning"
            :visible="removeVisible"
            @ok="selectRemove(selectedRowKeys)"
            @cancel="() => this.removeVisible=false"
        >
            <p>Are you sure to remove this camera?</p>
        </a-modal>
        
        <template>
            <a-upload
                accept=".json"
                :showUploadList="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :beforeUpload="beforeUpload"
            >
                <a-tooltip>
                    <template slot="title">
                        Import Camera List
                    </template>
            
                    <a-button :class="{'btnMargin10':true}">
                        <a-icon type="upload" :style="{color: 'rgb(77,166,255)'}" />
                    </a-button>
                </a-tooltip>
            </a-upload>
        </template>
        
        <a-tooltip>
            <template slot="title">
                Export Camera List
            </template>
            <a-button :class="{'btnMargin5':true}" @click="exportToJsonFile(cameras)">
                <a-icon type="download" :style="{color: 'rgb(77,166,255)'}" />
            </a-button>
        </a-tooltip>    <br /><br />

        <a-table 
        bordered 
        :columns="columns" 
        :dataSource="cameras"  
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
            <template slot="operation" slot-scope="text, record">
                <a-button :style="{border:'0px'}" ghost @click="editClick(record)">
                    <a-icon type="edit" :style="{color:'green'}" />
                </a-button>
                <a-popconfirm
                    v-if="cameras.length"
                    title="Sure to delete?"
                    @confirm="() => onDelete(record)"
                >
                    <a-button :style="{border:'0px'}" ghost><a-icon type="delete" :style="{color:'red'}" /></a-button>
                </a-popconfirm>
                
            </template>
        </a-table>

        <!------------------------------------------------------------------------------------------------------------>
        <AddCameraModal v-if="addModalVisible===true" :addModalVisible="addModalVisible" @addCamera="addCamera" @setVisible="setVisible" />
        <!------------------------------------------------------------------------------------------------------------>
        <EditCameraModal v-if="editModalVisible===true" :editModalVisible="editModalVisible" :editCameraInfo="editCameraInfo" @editCamera="editCamera" @setVisible="setVisible" />
        <!------------------------------------------------------------------------------------------------------------>
    </div>
</template>
<script>
import AddCameraModal from './AddCameraModal.vue'
import EditCameraModal from './EditCameraModal.vue'
import { deleteCamera } from '../repository'
import { addCamera } from '../repository'
import { getCameras } from '../repository'
import { searchCamera } from '../repository'
  
export default {
    components:{
        AddCameraModal,EditCameraModal
    },
    data() {
      return {
        selectedRowKeys:[],
        editCameraInfo:{},
        addModalVisible: false,
        editModalVisible: false,
        removeVisible:false,
        cameras:[],
        searchType:null,
        columns: [
          {
            title: 'NAME',
            dataIndex: 'cName',
            align: 'center'
          },
          {
            title: 'LABEL',
            dataIndex: 'label',
            align: 'center'
          },
          {
            title: 'OBJECT TYPE NAME',
            dataIndex: 'objType',
            align: 'center'
          },
          {
            title: 'GEO INFO',
            dataIndex: 'geo',
            align: 'center'
          },
          {
            title: 'RTSP',
            dataIndex: 'rtspURI',
            align: 'center'
          },
          {
            title: 'RECORD CAM NO',
            dataIndex: 'rcNum',
            align: 'center'
          },
          {
            title: 'Related MEDIA SERVERs',
            dataIndex: 'md',
            align: 'center'
          },
          {
            title: 'Realted RECORD SERVERs',
            dataIndex: 'rs',
            align: 'center'
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            scopedSlots:{ customRender: 'operation' },
          },
        ],
      };
    },
    methods:{
        addCamera(camera){
            this.cameras = [...this.cameras, camera];
        },
        setVisible(mode, visible){
            if(mode==="add"){
                this.addModalVisible=visible
            }
            else if(mode==="edit"){
                this.editModalVisible=visible
            }
        },

        editClick(record){
        this.editCameraInfo={...record}
        this.editModalVisible=true
        },

        editCamera(camera){
            this.cameras.some((item, index) => {
                if(item._id === camera._id){
                    this.cameras[index]=camera
                    return true;
                }
            })
        },
        
        onDelete(record) {
            deleteCamera(record._id)
            let cameras = this.cameras.filter(camera => camera._id != record._id)
            this.cameras=cameras
        },

        selectRemove(select){
            if(select.length === 0){
                alert("list check plz")
            } else{
                select.sort(function(a,b){
                    return b-a;     //desc
                })
                select.forEach(index => {
                    deleteCamera(this.cameras[index]._id)
                    this.cameras.splice(index,1)
                })
                this.selectedRowKeys=[]
                this.removeVisible=false
            }
        },
    
        exportToJsonFile(jsonData) {
            let dataStr = JSON.stringify(jsonData,null,2);
            let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            let exportFileDefaultName = 'cameraListData.json';

            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },
        
        beforeUpload(file){
            const fr=new FileReader();
            fr.onload=e=>{
                const result = JSON.parse(e.target.result);
                console.log(result)
                result.forEach(ele=>{
                    this.cameras.push(ele)
                    addCamera(ele)
                })               
            }
            fr.readAsText(file)
        }, 
        
        onSelectChange(selectedRowKeys){
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys=selectedRowKeys;
        },

        onSearch(value){
            searchCamera(this.searchType,value).then(data => {
                this.cameras = data.cameras
            })
            .catch((err => alert(err)));
            console.log(`input ${this.searchType} value: ${value}`)
        },

        handleChange(value){
            console.log(`selected ${value}`)
            this.searchType=value
        }
    },
    mounted(){
        getCameras()
            .then(data => {
                this.cameras = data.cameras
            })
            .catch((err => alert(err)));
    },
  }
</script>

<style lang="scss">
    .btnMargin10{
        margin-left: 10px;
    }

    .btnMargin5{
        margin-left: 5px;
    }

    .fontStyle{
        font-size: 20px
    }

    .btnStyle{
        font-weight: 500;
    }

    .ant-input-group{
        width:81%;
        float:left;
        .ant-input-search{
            width:94%;
        }
        .ant-select{
            width:85px;
        }
    }

    .ant-btn{
        margin-right:0px;
    }

    
</style>