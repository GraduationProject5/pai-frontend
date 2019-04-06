export function find(array, dataIndex, target) {
  return array.find((value, index, arr) => {
    return value[dataIndex] === target
  });
}

export function handleSettings(nodes) {
  nodes.map(node => {
    if (node.nodeid) {
      node.kind = 'component'
    } else {
      node.kind = 'table'
    }
    node.settings = JSON.stringify(node.settings);
    return node;
  })
}

export function sleep(mills) {
  let now = new Date();
  const exitTime = now.getTime() + mills;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}
