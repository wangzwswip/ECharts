<template>
  <div class="cms-dialog">
    <div class="cms-dialog-title" >
      <span>{{title}}</span>
      <span class="close"><i class="el-icon-close" @click="handleClose"/></span>
    </div>
    <div class="cms-dialog-body" :class="showFooter ? '' : 'show-footer'">
      <Scrollbar
        class="dialog-scrollbar__wrap"
        wrap-class="dialog-scrollbar__wrap">
        <slot/>
      </Scrollbar>
    </div>
    <div class="cms-dialog-btn" v-if="showFooter">
      <slot name="footer">
        <el-button @click="handleClose" class="dialog-button">取消</el-button>
        <el-button type="primary" class="dialog-button" @click="handleSubmit">保存</el-button>
      </slot>
    </div>
  </div>
</template>

<script>
import Scrollbar from '@assets/libs/scrollbar'

export default {
  name: 'Dialog',
  components: {
    Scrollbar
  },
  props: {
    action: [String],
    title: [String, Object],
    showFooter: {
      type: [Boolean],
      default: function () {
        return true
      }
    },
    fit: [Boolean],
    width: {
      type: [String],
      default: function () {
        return '360px'
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    handleClose () {
      this.$emit('on-close', this.action)
    },
    handleSubmit () {
      this.$emit('on-submit', this.action)
    }
  }
}
</script>

<style lang="scss">
  .cms-dialog {
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: 20px;
    left: 20px;
    background: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border-radius: 4px;
    z-index: 10;

    .xm-form__wrap {
      padding: 20px;

      .dialog-form {
        .el-select, .el-input, .el-cascader, .el-input-number {
          width: 100%;
        }

        .avatar-uploader, .upload-drag {
          .el-upload {
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;

            &:hover {
              border-color: #409EFF;
            }
          }

          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }

          .avatar {
            width: 100%;
            height: 178px;
            display: block;
          }

        }

        .el-range-editor {
          width: initial;

          .el-range-separator {
            padding: 0;
          }
        }
      }

      .form__tips {
        margin-top: 30px;
      }
    }

    .footSelect {
      .el-select {
        margin: 0 20px 0 10px !important;
      }
    }

    .cms-dialog-title {
      position: relative;
      display: inline-block;
      line-height: 61px;
      height: 61px;
      width: 100%;
      padding: 0 10px;
      color: #333;
      font-weight: bold;
      font-size: 16px;
      background: #fff;
      overflow: hidden;
      border-bottom: 1px solid #ebeef5;

      .close {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: .3s;
        text-align: center;
        width: 16px;
        height: 16px;
        line-height: 16px;

        &:hover {
          transform: translateY(-50%) rotate(360deg);
          color: $main-color;
        }
      }

    }

    .cms-dialog-body {
      position: absolute;
      top: 61px;
      bottom: 56px;
      width: 100%;
      overflow: hidden;

      .el-scrollbar__view {
        height: 100%;
      }

      .dialog-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
      }
    }
    .show-footer {
      bottom: 0;
    }

    .cms-dialog-btn {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: right;
      line-height: 56px;
      height: 56px;
      padding: 0 10px;
      border-top: 1px solid #ebeef5;

      &:before {
        position: absolute;
        top: -31px;
        left: 0;
        display: inline-block;
        content: ' ';
        height: 30px;
        width: 100%;
        background-image: linear-gradient(-180deg, #fff0 0%, #fff 100%);
        pointer-events: none;
      }
    }

    .ql-toolbar {
      border-radius: 4px 4px 0 0;
    }

    .ql-container {
      border-radius: 0 0 4px 4px;

      .ql-video {
        margin: auto;
        width: 469px;
        height: 300px;
      }

      img {
        max-width: 469px;
        max-height: 300px;
      }
    }

    .quill-wrap {
      padding: 0 0 20px;
    }

    .form-button {
      line-height: 30px;
      padding: 0 5px;
      border-radius: 4px;
      transition: .3s;

      &:before {
        margin-right: 5px;
        float: left;
      }

      &:hover {
        cursor: pointer;
        color: #1e7eea;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
