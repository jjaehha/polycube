function findUniquePath(graph, nodePairs) {
  function dfs(node, path) {
    path.push(node);
    if (path.length === graph[node].length + 1) {
      uniquePath = path.slice(); // 유일한 경로를 찾으면 저장하고 종료
      return;
    }
    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        dfs(neighbor, path);
        visited[neighbor] = false;
        path.pop();
      }
    }
  }

  let startNode = nodePairs[0][0]; // 시작 노드는 첫 번째 노드 쌍의 첫 번째 노드로 가정
  let visited = {};
  let uniquePath = null;

  visited[startNode] = true;
  dfs(startNode, []);

  return uniquePath;
}

// 주어진 그래프
let graph = {
  A: ["B", "D"],
  B: ["A", "C", "D", "E"],
  C: ["B", "D", "E"],
  D: ["A", "B", "C", "E"],
  E: ["B", "C", "D"],
};

// 테스트 케이스 입력
let nodePairs = [
  ["A", "B"],
  ["B", "C"],
  ["B", "D"],
  ["C", "D"],
];

// 함수 호출 및 결과 출력
let result = findUniquePath(graph, nodePairs);
if (result) {
  console.log("존재하는 경로:", result.join(" -> "));
} else {
  console.log("해당 조건을 만족하는 경로가 존재하지 않습니다.");
}
