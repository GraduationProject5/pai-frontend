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
        isChild: true
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
        isChild: true
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
        isChild: true
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
        isChild: true
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
