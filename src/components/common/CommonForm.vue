<template>
  <Dialog
    :title="action + config.title"
    @on-close="handleClose"
    @on-submit="handleSubmit"
  >
    <div class="xm-form__wrap">
      <el-form ref="form" label-position="top" :rules="rules" :model="form" label-width="80px" class="dialog-form">
        <el-row :gutter="20">
          <el-col v-for="item in config.fields" :key="item.name" :span="widthSelect(item.type)">
            <el-form-item :label="item.label" v-if="item.type !== 'upload'">

              <!-- 输入框 -->
              <el-input
                v-if="item.type === 'input'"
                v-model="form[item.name]"
                :disabled="disableCommon"
                :placeholder="'请输入' + item.label"/>

              <!-- 文本框 -->
              <el-input
                v-if="item.type === 'textarea'"
                type="textarea"
                :disabled="disableCommon"
                v-model="form[item.name]"
                :placeholder="'请输入' + item.label"/>

              <!-- 日期时间框 -->
              <el-date-picker
                v-if="item.type === 'datetime'"
                v-model="form[item.name]"
                :disabled="disableCommon"
                type="datetime"
                value-format="timestamp"
                :placeholder="'选择' + item.label">
              </el-date-picker>

              <!-- 日期时间框 -->
              <el-date-picker
                v-if="item.type === 'date'"
                v-model="form[item.name]"
                :disabled="disableCommon"
                type="date"
                value-format="timestamp"
                :placeholder="'选择' + item.label">
              </el-date-picker>
              <!-- 下拉框 -->
              <el-select
                v-if="item.type === 'select'"
                v-model="form[item.name]"
                :disabled="disableCommon"
                :placeholder="'请选择' + item.label"
              >
                <el-option
                  v-for="item in options[item.selectCode]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!disableCommon">
          <el-col v-for="item in config.fields" :key="item.name" :span="widthSelect(item.type)">
            <el-form-item :label="item.label" v-if="item.type === 'upload'">
              <!-- 文件上传 -->
              <el-upload
                class="upload-drag"
                drag
                :file-list="form[item.name]"
                :action="uploadUrl"
                :on-success="(res, file) => handleUploadSuccess(res, file, item.name)"
                :on-remove="(file) => handleUploadRemove(file, item.name)"
                :limit="1">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="hasUpload && disableCommon">
          <el-col>
            <p style="margin: 5px 0">附件</p>
            <el-link type="primary"  v-for="(item, index) in form.fj" :key="index" @click="downFj(item.id)">{{item.name}}</el-link>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </Dialog>
</template>

<script>
import { deepClone } from '@/assets/libs/util'
import { url } from '@/services/api'

export default {
  name: 'CommonForm',
  props: {
    params: {
      type: [Object],
      default: function () {
        return {}
      }
    },
    config: {
      type: [Object],
      default: function () {
        return {}
      }
    },
    options: {
      type: [Object],
      default: function () {
        return {}
      }
    },
    disableCommon: {
      type: [Boolean],
      default: false
    }
  },
  data () {
    return {
      hasUpload: false,
      action: '新增',
      uploadUrl: url + '/crms-business-service/file/fileupload',
      fileUrl: '',
      form: { fj: [] },
      rules: {
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }]
      },
      fbList: [
        {
          name: 'gfjtjgqktjby',
          fb: '1'
        },
        {
          name: 'gfjtjgqktjbe',
          fb: '2'
        },
        {
          name: 'gfjtjgryqktjb',
          fb: '3'
        },
        {
          name: 'gfjtzybzdwtjb',
          fb: '4'
        },
        {
          name: 'zltszydwqkb',
          fb: '5'
        },
        {
          name: 'myqcqltjb',
          fb: '6'
        },
        {
          name: 'kzycltjb',
          fb: '7'
        },
        {
          name: 'gfjtxlyltjb',
          fb: '8'
        },
        {
          name: 'gfjtkyxmtjb',
          fb: '9'
        },
        {
          name: 'gfjtxslwfbqktjb',
          fb: '10'
        },
        {
          name: 'zdjtmbqkb',
          fb: '11'
        },
        {
          name: 'gfjtwzcbcksyqkb',
          fb: '12'
        },
        {
          name: 'gfjtckcbwzqkb',
          fb: '13'
        },
        {
          name: 'gfjtrwbzwcqkb',
          fb: '14'
        },
        {
          name: 'gfjtzbssjsqkb',
          fb: '15'
        },
        {
          name: 'jtgcssjsgcgfyq',
          fb: '16'
        },
        {
          name: 'glhyxzqsydwqkb',
          fb: '17'
        },
        {
          name: 'glxlqktjb',
          fb: '18'
        },
        {
          name: 'glsdqktjb',
          fb: '19'
        },
        {
          name: 'glqlqktjb',
          fb: '20'
        },
        {
          name: 'gljyztjb',
          fb: '21'
        },
        {
          name: 'gsglfwqtjb',
          fb: '22'
        },
        {
          name: 'ggwd',
          fb: '23'
        },
        {
          name: 'bgs',
          fb: '24'
        }
      ]
    }
  },
  created () {
    this.config.fields.map(item => {
      if (item.type === 'upload') {
        this.hasUpload = true
      }
    })
    if (this.params.id) {
      this.action = '编辑'
      // this.getFileUrl()
      this.form = deepClone(this.params)
    }
    this.fbList.map(item => {
      if (item.name === this.$route.query.key) {
        this.form.fb = item.fb
      }
    })
  },
  mounted () {
    // this.getDictionary()
  },
  methods: {
    downFj (item) {
      this.$http.office.downloadFile(item)
    },
    handleSubmit () {
      console.log(this.params.id, '11123')
      if (!this.params.id) {
        this.handleAdd()
      } else {
        this.handleUpdate()
      }
    },
    handleAdd () {
      this.$http.common.addCommon(this.config.service, this.form)
        .then(res => {
          this.$emit('on-submit')
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
          console.error('保存失败: ', e)
        })
    },
    handleUpdate (_action) {
      this.$http.common.updateCommon(this.config.service, this.form)
        .then(res => {
          this.$emit('on-submit')
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '保存失败'
          })
          console.error('保存失败: ', e)
        })
    },
    handleClose (_action) {
      this.$emit('on-close', _action)
    },
    widthSelect (_type) {
      if (_type !== 'textarea' && _type !== 'upload') return 8
      return 24
    },
    handleUploadSuccess (_res, _file, _key) {
      console.log('前', this.form[_key])
      if (this.form[_key] === undefined || this.form[_key] === null) {
        this.form[_key] = []
      }
      this.form[_key].push({ url: _res.data[0], name: _file.name })
      console.log(this.form[_key])
    },
    handleUploadRemove (_file, _key) {
      this.form[_key].map((item, index) => {
        if (item.name === _file.name) {
          this.form[_key].splice(index, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
