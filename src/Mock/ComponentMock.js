export const sections = [
  {
    sectionID: 1,
    sectionName: '机器学习组件',
    components: [
      {
        componentID: 2,
        componentName: 'svm',
        funcName: 'svm',
        settings: {
          'a': 1,
          'b': 2,
          'c': 3
        },
      }
    ]
  },
  {
    sectionID: 2,
    sectionName: '评估组件',
    components: []
  },
];


export const components = [
  {
    id: 1,
    name: '机器学习1',
    isChild: false,
    children: [
      {
        id: 2,
        name: '朴素贝叶斯',
        type: 'Bayes',
        anchor: [
          [0.5, 0, {
            type: 'input'
          }],
          [0.5, 1, {
            type: 'output'
          }]
        ],
        isChild: true,
        paras: {
          'a': 1,
          'b': 2,
          'c': 3
        }
      },
      {
        id: 3,
        name: 'PS-SMART 分类',
        type: 'PS-SMART',
        anchor: [
          [0.5, 0, {
            type: 'input'
          }],
          [0.33, 1, {
            type: 'output'
          }],
          [0.66, 1, {
            type: 'output'
          }]
        ],
        isChild: true,
        paras: {
          'a': 1,
          'b': 2,
          'c': 3
        }
      },
    ]
  },
  {
    id: 4,
    name: '机器学习2',
    isChild: false,
    children: [
      {
        id: 5,
        name: '随机森林',
        type: 'random-forest',
        anchor: [
          [0.5, 0, {
            type: 'input'
          }],
          [0.5, 1, {
            type: 'output'
          }]
        ],
        isChild: true,
        paras: {
          'a': 1,
          'b': 2,
          'c': 3
        }
      },
      {
        id: 6,
        name: 'k 均值聚类',
        type: 'k-means',
        anchor: [
          [0.5, 0, {
            type: 'input'
          }], // 上面边的中点
          [0.5, 1, {
            type: 'output'
          }] // 下边边的中点
        ],
        isChild: true,
        paras: {
          'a': 1,
          'b': 2,
          'c': 3
        }
      },
      {
        id: 7,
        name: '机器学习3',
        isChild: false,
        children: []
      },
    ]
  },
];

/**
 * 一个实验中每个组件的结果
 *  id: 实验结果id
 *  experimentId: 对应的实验
 *  results: 结果列表
 *    id: 组件结果id
 *    type: 结果展示类型 （table：表格。可能会有图表）
 *    paras: 结果展示类型为 table 时表格的表头参数
 *      title：表头名
 *      dataIndex: 对应数据标识
 *      key：表头键
 *    data：数据
 *      id：数据id
 */
export const result = {
  id: 1,
  experimentId: 1,
  results: [
    {
      id: 2,
      type: 'table',
      paras: [
        {
          title: 'a',
          dataIndex: 'a',
          key: 'a',
        },
        {
          title: 'b',
          dataIndex: 'b',
          key: 'b',
        },
        {
          title: 'c',
          dataIndex: 'c',
          key: 'c',
        },
      ],
      data: [
        {
          id: 1,
          a: '第一1',
          b: '第二1',
          c: '第三1'
        },
        {
          id: 2,
          a: '第一2',
          b: '第二2',
          c: '第三2'
        },
        {
          id: 3,
          a: '第一3',
          b: '第二3',
          c: '第三3'
        },
        {
          id: 4,
          a: '第一4',
          b: '第二4',
          c: '第三4'
        }]
    },
    {
      id: 3,
      type: 'table',
      paras: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }],
      data: [{
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
      }, {
        id: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      }, {
        id: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      }]
    },
    {
      id: 5,
      type: 'table',
      paras: [
        {
          title: 'a',
          dataIndex: 'a',
          key: 'a',
        },
        {
          title: 'b',
          dataIndex: 'b',
          key: 'b',
        },
        {
          title: 'c',
          dataIndex: 'c',
          key: 'c',
        },
      ],
      data: [{
        id: 1,
        a: '第一1',
        b: '第二1',
        c: '第三1'
      },
        {
          id: 2,
          a: '第一2',
          b: '第二2',
          c: '第三2'
        },
        {
          id: 3,
          a: '第一3',
          b: '第二3',
          c: '第三3'
        },
        {
          id: 4,
          a: '第一4',
          b: '第二4',
          c: '第三4'
        }]
    },
    {
      id: 6,
      type: 'table',
      paras: [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }],
      data: [{
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
      }, {
        id: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      }, {
        id: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      }]
    }
  ],
};


const temp = {
  experimentID: 13,
  nodes: [
    {
      desc: "testCreateTableByColumn",
      id: "af97edd6",
      index: 0,
      kind: "table",
      label: "testCreateTableByColumn",
      name: "testCreateTableByColumn",
      shape: "read-data-table",
      size: "170*34",
      type: "node",
      x: 278,
      y: -25
    },
    {
      id: "e544928d",
      index: 0,
      kind: "component",
      label: "svm",
      name: "svm",
      nodeid: "2",
      settings: {A: 1, B: 2, C: 3},
      shape: "svm",
      size: "170*34",
      type: "node",
      x: 164,
      y: 99
    },
    {
      id: "5b5f9ee2",
      index: 1,
      kind: "component",
      label: "逻辑回归",
      name: "逻辑回归",
      nodeid: "3",
      settings: {A: 1, B: 2, C: 3},
      shape: "lr",
      size: "170*34",
      type: "node",
      x: 173,
      y: 242
    }
  ],
  edges: [
    {
      id: "cd1a85f8",
      index: 2,
      source: "e544928d",
      sourceAnchor: 1,
      target: "5b5f9ee2",
      targetAnchor: 0
    }
  ]
};

