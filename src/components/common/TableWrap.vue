<template>
  <div class="table__wrap"
       v-loading="loading"
       element-loading-text="拼命加载中..."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(173, 248, 253, 0.3)"
  >
    <slot/>
    <div class="pagination__wrap" v-if="!showfooter">
      <el-pagination
        class="pagination-wrap"
        :current-page="page.current"
        :page-size="page.limit"
        :page-sizes="[10, 20, 30, 40]"
        @current-change="pageChange"
        @size-change="sizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableWrap',
  props: {
    pages: [Object],
    loading: [Boolean],
    footershow: [Boolean],
    showfooter: [Boolean]
  },
  data () {
    return {
      page: {
        current: 1,
        limit: 20,
        total: 0
      }
    }
  },
  mounted () {
    this.page = this.pages
  },
  watch: {
    pages: function (v) {
      this.page = v
    }
  },
  methods: {
    pageChange (current) {
      this.page.current = current
      this.$emit('handle-page', this.page)
    },
    sizeChange (number) {
      this.page.limit = number
      this.page.current = 1
      this.$emit('handle-page', this.page)
    }
  }
}
</script>
<style lang="scss">
  .el-icon-loading {
    font-size: 40px;
    margin-bottom: 20px;
  }
  .table__wrap {
    overflow: auto;
    display: flex;
    flex-flow: column;
    height: 100%;
    background: #fff;

    .search__wrap {
      background: #fff;
      text-align: left;
      padding: 25px 20px 15px 20px;
      // border-bottom: 1px solid #ebeef5;

      .search__content {
        float: left;
      }

      .el-input, .el-select {
        width: 150px;
      }

      .el-form-item {
        margin-bottom: 0;
      }

      .el-form-item__label {
        line-height: 32px;
        font-size: 12px;
        padding: 0;
      }

      .button__wrap {
        float: right;
      }
    }

    .table__content {
      overflow: auto;
      display: flex;
      flex-flow: column;
      height: 100%;
      padding: 0 20px;
      .handle-text {
        display: inline-block;
        padding: 0 5px;
        cursor: pointer;
        color: rgba(43, 149, 149, 0.8);
        &:hover {
          color: rgba(43, 149, 149, 1);
        }
      }
      .el-table__header {
        background: #F8F8F8 !important;
      }
      .el-table__header th{
        background:#F8F8F8;
      }
      .el-dropdown-link {
        display: inline-block;
        width: 30px;
        border-radius: 4px;
        transition: .3s;

        &:hover {
          cursor: pointer;
          color: $main-color;
          background: rgba($color: #000, $alpha: 0.1);
        }
      }
    }

    .pagination__wrap {
      background: #fff;

      .pagination-wrap {
        padding: 10px 20px;
        text-align: right;

        .el-pagination {
          padding: 0;
        }
      }
    }

    .table-header {
      th {
        background: #fff;
      }
    }
  }
</style>
