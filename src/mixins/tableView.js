export default {
  data () {
    return {
      tableList: [],
      tableHeight: 0,
      listItem: {},
      multipleSelection: '',
      search: {},
      showDialog: false,
      page: {
        current: 1,
        limit: 20,
        total: 0
      }
    }
  },
  mounted () {
    this.tableResize()
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    tableResize () {
      if (this.$refs.tableWrap) {
        this.tableHeight = this.$refs.tableWrap.offsetHeight
        window.onresize = () => {
          this.tableHeight = this.$refs.tableWrap.offsetHeight
        }
      }
    },

    handleSelectionChange (_val) {
      const idArray = []
      _val.filter(item => {
        idArray.push(item.id)
      })

      this.multipleSelection = idArray.join(',')
      console.log(this.multipleSelection)
    },

    handleCommand (_item, _row) {
      this['handle' + _item](_row)
    },
    // 保存成功回调
    handleSuccess () {
      this.showDialog = false
      this.getList()
      // this.$refs.companyTree.getCarCompanyTree()
    },
    // 条件查询
    handleSearch (_form) {
      console.log('您当前搜索框的内容', _form)
      this.search = _form
      this.page.current = 1
      this.getList()
    },
    // 操作弹框
    handleSelect (_item) {
      this.actionType = '查看'// actionType用来判断显示哪个表单，误删
      this.listItem = _item
      this.showDialog = true
    },
    handleSelectTwo (_item) { // SelectTwo用来判断两个查看时
      this.actionType = '查看2'
      this.listItem = _item
      this.showDialog = true
    },
    handleAdd (_item) {
      this.actionType = '新增'
      this.listItem = _item
      this.showDialog = true
    },
    handleUpdate (_item) {
      this.actionType = '编辑'
      this.listItem = _item
      this.showDialog = true
    },
    dialogClose () {
      this.listItem = {}
      this.showDialog = false
    },
    dialogSubmit () {
      this.showDialog = false
      this.listItem = {}
      this.getList()
    },
    // 删除流程
    handleRemove (_item) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeFunc(_item)
      })
    },

    // 批量删除
    handleBatchRemove () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请选择要删除的数据!', '删除提示', {
          confirmButtonText: '确定'
        })
        return
      }

      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.batchRemoveFunc(this.multipleSelection)
      })
    },
    // 分页
    handlePage (page) {
      this.page = page
      this.getList()
    }
  }
}
