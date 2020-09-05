/**
 * 棒グラフ
 * https://wizardace.com/d3-barchart001/
 */
(function() {
  // 1.データの準備
  const dataset = [
    { "name": "A", "value": 5 },
    { "name": "B", "value": 6 },
    { "name": "C", "value": 8 },
    { "name": "D", "value": 1 },
    { "name": "E", "value": 2 },
    { "name": "F", "value": 6 },
    { "name": "G", "value": 8 },
    { "name": "H", "value": 6 },
    { "name": "I", "value": 10 },
    { "name": "J", "value": 9 }
  ];
  const width = 400;
  const height = 300;
  const padding = 30;

  // 2.SVG領域の設定
  const svg = d3.select('.body1')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // 3.tooltip用のdiv要素追加
  const tooltip = d3.select('.body1')
    .append('div')
    .attr('class', 'tooltip');

  // 3.軸スケールの設定
  const xScale = d3.scaleBand()
    .rangeRound([padding, width - padding])
    .padding(0.1)
    .domain(dataset.map(d => {
      return d.name;
    }));

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d.value;
    })])
    .range([height - padding, padding]);

  // 4.軸の表示
  svg.append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(d3.axisLeft(yScale));

  // 5.バーの表示
  svg.append('g')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', d => {
      return xScale(d.name);
    })
    .attr('y', d => {
      return yScale(d.value);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', d => {
      return height - padding - yScale(d.value);
    })
    .attr('fill', 'steelblue')
    .attr('class', 'bar')
    // マウス&タッチイベント設定
    .on('mouseover', d => {
      tooltip
        .style('visibility', 'visible')
        .html(`name : ${d.name}<br>value : ${d.value}`);
    })
    .on('mousemove', d => {
      tooltip
        .style('top', `${d3.event.pageY - 20}px`)
        .style('left', `${d3.event.pageX + 10}px`);
    })
    .on('mouseout', d => {
      tooltip.style('visibility', 'hidden');
    });

})();


/**
 * 棒グラフを並び替える方法
 * https://wizardace.com/barchartsort/
 */
(function() {
  // 1.データの準備
  const dataset = [
    { "name": "A", "value": 5 },
    { "name": "B", "value": 6 },
    { "name": "C", "value": 8 },
    { "name": "D", "value": 1 },
    { "name": "E", "value": 2 },
    { "name": "F", "value": 6 },
    { "name": "G", "value": 8 },
    { "name": "H", "value": 6 },
    { "name": "I", "value": 10 },
    { "name": "J", "value": 9 }
  ];
  const width = 400;
  const height = 300;
  const padding = 30;

  const svg = d3.select('.body2')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 2.並べ替え用スケール設定
  const xScale1 = d3.scaleBand()
    .rangeRound([padding, width - padding])
    .padding(0.1)
    .domain(dataset.map(d => {
      return d.name;
    }));

  dataset.sort((a, b) => {
    if(a.value < b.value) return 1;
    if(a.value > b.value) return -1;
    return 0;
  });

  const xScale2 = d3.scaleBand()
    .rangeRound([padding, width - padding])
    .padding(0.1)
    .domain(dataset.map(d => {
      return d.name;
    }));

  dataset.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d.value;
    })])
    .range([height - padding, padding]);

  const axisx = d3.axisBottom(xScale1);
  const axisy = d3.axisLeft(yScale);

  // 3.X軸スケールの挿入とクリックイベント設定
  let flg = 0;
  svg.append('g')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(axisx)
    .attr('class', 'xScale')
    .attr('cursor', 'pointer')
    .selectAll('.tick')
    .data(dataset)
    .on('click', () => {
      if(flg === 0) {
        d3.selectAll('.bar')
          .transition()
          .duration(500)
          .attr('x', d => {
            // ここで返している値がいまいちピンとこない
            return xScale2(d.name);
          });
        d3.selectAll('.xScale .tick')
          .transition()
          .duration(500)
          .attr('transform', d => {
            // ここで返している値がいまいちピンとこない
            return `translate(${(xScale2.bandwidth() + xScale2.padding()) / 2 + xScale2(d.name)}, 0)`;
          });
        flg = 1;
      } else {
        d3.selectAll('.bar')
          .transition()
          .duration(500)
          .attr('x', d => {
            return xScale1(d.name);
          });
        d3.selectAll('.xScale .tick')
          .transition()
          .duration(500)
          .attr('transform', d => {
            return `translate(${(xScale1.bandwidth() + xScale1.padding()) / 2 + xScale1(d.name)}, 0)`;
          });
        flg = 0;
      }
    });

    // 4.Y軸スケールの挿入
    svg.append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .call(axisy);

    // 5.グラフの挿入
    svg.append('g')
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => {
        return xScale1(d.name);
      })
      .attr('y', d => {
        return yScale(d.value);
      })
      .attr('width', xScale1.bandwidth())
      .attr('height', d => {
        return height - padding - yScale(d.value);
      })
      .attr('fill', 'steelblue');

})();


/**
 * 円グラフの作成
 * https://wizardace.com/d3-piechart/
 */
(function() {
  // 1.データの準備
  const dataset = [
    { "name": "A", "value": 5 },
    { "name": "B", "value": 6 },
    { "name": "C", "value": 8 },
    { "name": "D", "value": 1 },
    { "name": "E", "value": 2 },
    { "name": "F", "value": 6 },
    { "name": "G", "value": 8 },
    { "name": "H", "value": 6 },
    { "name": "I", "value": 10 },
    { "name": "J", "value": 9 }
  ];

  const width = 400;
  const height = 300;
  const radius = Math.min(width, height) / 2 - 10;

  // 2.SVG領域の設定
  const svg = d3.select('.body3')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // 3.カラーの設定
  const color = d3.scaleOrdinal()
    .range(['#DC3912', '#3366CC', '#109618', '#FF9900', '#990099']); // d3.scaleOrdinalはrangeで設定した配列を繰り返し呼び出す関数を設定します。

  // 4. pieチャート用関数の設定
  const pie = d3.pie()
    .value(d => {
      return d.value;
    })
    .sort(null); // 用意したデータdatasetをpieチャート用のデータに変換する関数を、D3のメソッドd3.pieを使って設定します。

  // 5.pieチャートSVG要素の設定
  const pieGroup = g.selectAll('.pie')
    .data(pie(dataset))
    .enter()
    .append('g')
    .attr('class', 'pie');

  const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0); // 円グラフの扇”path”要素の”d”属性を設定するための関数を、D3のメソッドd3.arcを使って設定します。

  pieGroup.append('path')
    .attr('d', arc)
    .attr('fill', d => {
      return color(d.index);
    })
    .attr('opacity', .75)
    .attr('stroke', 'white');

  // 6.pieチャートテキストSVG要素の設定
  const text = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);

  pieGroup.append('text')
    .attr('fill', 'black')
    .attr('transform', d => {
      return `translate(${text.centroid(d)})`;
    })
    .attr('dy', '5px')
    .attr('font', '10px')
    .attr('text-anchor', 'middle')
    .text(d => {
      return d.data.name;
    })
})();


/**
 * 散布図の作成
 * https://wizardace.com/d3-scatterplot/
 */
(function() {
  // 1.データの準備
  const dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
  ];

  const width = 400;
  const height = 300;
  const margin = {
    'top': 30,
    'bottom': 60,
    'right': 30,
    'left': 60
  };

  // 2.SVG領域の設定
  const svg = d3.select('.body4')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.軸スケールの設定
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d[0];
    })])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d[1];
    })])
    .range([height - margin.bottom, margin.top]);

  // 4.軸の表示
  const axisx = d3.axisBottom(xScale).ticks(5);
  const axisy = d3.axisLeft(yScale).ticks(5);

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisx)
    .append('text')
    .attr('fill', 'black')
    .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10pt')
    .attr('font-weight', 'bold')
    .text('X Label');

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisy)
    .append('text')
    .attr('fill', 'black')
    .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
    .attr('y', -35)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .attr('font-size', '10pt')
    .text('Y Label');

  svg.append('g')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', d => {
      return xScale(d[0]);
    })
    .attr('cy', d => {
      return yScale(d[1]);
    })
    .attr('fill', 'steelblue')
    .attr('r', 4);

})();


/**
 * 折れ線グラフの作成
 * https://wizardace.com/d3-linechart-base/
 */
(function() {
  // 1.データの準備
  const dataset = [
    [5, 20],
    [25, 67],
    [85, 21],
    [100, 33],
    [220, 88],
    [250, 50],
    [330, 95],
    [410, 12],
    [475, 44],
    [480, 90]
  ];

  const width = 400;
  const height = 300;
  const margin = {
    top: 30,
    bottom: 60,
    right: 30,
    left: 60
  };

  // 2.SVG領域の設定
  const svg = d3.select('.body5')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.軸スケールの設定
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d[0];
    })])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => {
      return d[1];
    })])
    .range([height - margin.bottom, margin.top]);

  // 4.軸の表示
  const axisx = d3.axisBottom(xScale).ticks(5);
  const axisy = d3.axisLeft(yScale).ticks(5);

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisx)
    .append('text')
    .attr('fill', 'black')
    .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10pt')
    .attr('font-weight', 'bold')
    .text('X Label');

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisy)
    .append('text')
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
    .attr('y', -35)
    .attr('transform', 'rotate(-90)')
    .attr('font-weight', 'bold')
    .attr('font-size', '10pt')
    .text('Y Label');

  // 5.ラインの表示
  svg.append('path')
    .datum(dataset) // ひとつづつのデータをバインドするdataと異なり、path一つにデータセットを追加するためdatumを用います。
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
      .x(d => {
        return xScale(d[0]);
      })
      .y(d => {
        return yScale(d[1]);
      }));

})();


/**
 * cluster 使い方
 * https://wizardace.com/d3-cluster/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B" },
      {
        "name": "C",
        "children": [{ "name": "D" }, { "name": "E" }, { "name": "F" }]
      },
      { "name": "G" },
      {
        "name": "H",
        "children": [{ "name": "I" }, { "name": "J" }]
      },
      { "name": "K" }
    ]
  };

  const width = 800;
  const height = 600;

  // 2.SVG領域の設定
  const svg = d3.select('.body6')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.描画用のデータ変換
  const root = d3.hierarchy(data);
  const cluster = d3.cluster()
    .size([height, width - 160]);
  cluster(root);

  // 4.SVG要素の配置
  const g = svg.append('g')
    .attr('transform', 'translate(80, 0)');

  const link = g.selectAll('.link')
    .data(root.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d => {
      return `M${d.y},${d.x} C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${d.parent.x} ${d.parent.y},${d.parent.x}`;
    });

  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('transform', d => {
      return `translate(${d.y}, ${d.x})`;
    });

  node.append('circle')
    .attr('r', 8)
    .attr('fill', '#999');

  node.append('text')
    .attr('dy', 3)
    .attr('x', d => {
      d.children ? -12 : 12;
    })
    .style('text-anchor', d => {
      return d.children ? 'end' : 'start';
    })
    .attr('font-size', '200%')
    .text(d => {
      return d.data.name;
    });

})();


/**
 * cluster 円周上にノードを配置する方法
 * https://wizardace.com/d3-cluster-radial/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B" },
      {
        "name": "C",
        "children": [{ "name": "D" }, { "name": "E" }, { "name": "F" }]
      },
      { "name": "G" },
      {
        "name": "H",
        "children": [{ "name": "I" }, { "name": "J" }]
      },
      { "name": "K" },
      {
        "name": "L",
        "children": [{ "name": "M" }, { "name": "N" }]
      },
      { "name": "O" },
      { "name": "P" }
    ]
  };

  const width = 800;
  const height = 600;
  const rx = width / 2;
  const ry = height / 2;

  // 2.SVG領域の設定
  const svg = d3.select('.body7')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.描画用データの変換
  const root = d3.hierarchy(data);
  const cluster = d3.cluster().size([360, ry - 80])
  cluster(root);

  // 4.SVG要素の配置
  const g = svg.append('g')
    .attr('transform', `translate(${rx}, ${ry})`);

  const link = g.selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-width', '1.5px')
    .attr('opacity', '.6')
    .attr('d', d3.linkRadial()
      .angle(d => {
        return (d.x + 90) * Math.PI / 180;
      })
      .radius(d => {
        return d.y;
      })
    );

  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('transform', d => {
      return `rotate(${d.x}) translate(${d.y})`;
    });

  node.append('circle')
    .attr('r', 8)
    .attr('stroke', 'steelblue')
    .attr('stroke-width', '1.5px')
    .attr('fill', 'white');

  node.append('text')
    .attr('dy', 3)
    .attr('dx', d => {
      return d.x < 90 || d.x > 270 ? 8 : -8;
    })
    .style('text-anchor', d => {
      return d.x < 90 || d.x > 270 ? 'start' : 'end';
    })
    .attr('font-size', '200%')
    .attr('transform', d => {
      return d.x < 90 || d.x > 270 ? null : 'rotate(180)';
    })
    .text(d => {
      return d.data.name;
    });

})();


/**
 * tree 使い方
 * https://wizardace.com/d3-tree/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B" },
      {
        "name": "C",
        "children": [{ "name": "D" }, { "name": "E" }, { "name": "F" }]
      },
      { "name": "G" },
      {
        "name": "H",
        "children": [{ "name": "I" }, { "name": "J" }]
      },
      { "name": "K" }
    ]
  };

  const width = 400;
  const height = 300;

  // 2.SVG領域の設定
  const svg = d3.select('.body8')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.描画用のデータ変換
  const root = d3.hierarchy(data);
  const tree = d3.tree()
    .size([height, width - 160]);
  tree(root);

  // 4.SVG要素の配置
  const g = svg.append('g')
    .attr('transform', 'translate(80, 0)');

  const link = g.selectAll('.link')
    .data(root.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d => {
      return `M${d.y},${d.x}C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${d.parent.x} ${d.parent.y},${d.parent.x}`;
    });

  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => {
      return `translate(${d.y}, ${d.x})`;
    });
  node.append('circle')
    .attr('r', 8)
    .attr('fill', '#999');
  node.append('text')
    .attr('dy', 3)
    .attr('x', d => {
      d.children ? -12 : 12;
    })
    .style('text-anchor', d => {
      d.children ? 'end' : 'start';
    })
    .attr('font-size', '200%')
    .text(d => {
      return d.data.name;
    });
})();


/**
 * treeを開閉する方法
 * https://wizardace.com/d3-collapsible-tree/
 * ⇒一部色の表示が上手くいかないが、一旦終了
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B" },
      {
        "name": "C",
        "children": [{ "name": "D" }, { "name": "E" }, { "name": "F" }]
      },
      { "name": "G" },
      {
        "name": "H",
        "children": [{ "name": "I" }, { "name": "J" }]
      },
      { "name": "K" }
    ]
  }
  const width = 400;
  const height = 300;

  // 2.SVG領域の設定
  const svg = d3.select('.body9')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // 3.描画用データの変換
  const root = d3.hierarchy(data);
  root.x0 = height / 2;
  root.y0 = 0;

  const tree = d3.tree().size([height, width - 160]);

  const g = svg.append('g')
    .attr('transform', 'translate(80, 0)');
  update(root);

  // 4.クリック時の呼び出し関数
  function toggle(d) {
    if(d.children) {
      d._children = d.children; // ノードをもう一度クリックした際に再表示するため、折り畳み時に_children変数を定義してchildrenを退避し、再クリック時に_childrenをchildrenに戻すことで開閉動作を可能にします。
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  }

  // 5.SVG要素の更新関数
  var i = 0;
  function update(source) {
    // treeレイアウト位置を計算
    tree(root);

    // 子、孫方向の位置設定
    root.each(d => {
      d.y = d.depth * 160;
    });

    // ノードデータをSVG要素の設定
    const node = g.selectAll('.node')
      .data(root.descendants(), d => {
        return d.id || (d.id = ++i);
      });

    // ノードenter領域の設定
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        return `translate(${source.y0}, ${source.x0})`;
      })
      .on('click', d => {
        toggle(d);
        update(d);
      });

    nodeEnter.append('circle')
      .attr('r', 5)
      .style('fill', d => {
        return d._children ? 'lighrsteelblue' : '#fff';
      });

    nodeEnter.append('text')
      .attr('x', d => {
        return d.children || d._children ? -13 : 13;
      })
      .attr('dy', '3')
      .attr('font-size', '150%')
      .attr('text-anchor', d => {
        d.children || d._children ? 'end' : 'start';
      })
      .text(d => {
        return d.data.name;
      })
      .style('fill-opacity', 1e-6);

    // ノードenter+update領域の設定
    const nodeUpdate = nodeEnter.merge(node);
    const duration = 500;

    nodeUpdate.transition()
      .duration(duration)
      .attr('transform', d => {
        return `translate(${d.y}, ${d.x})`;
      });

    nodeUpdate.select('circle')
      .attr('r', 8)
      .style('fill', d => {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    nodeUpdate.select('text')
      .style('fill-opacity', 1);

    // ノードexit領域の設定
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', d => {
        return `translate(${source.y}, ${source.x})`;
      })
      .remove();

    nodeExit.select('circle')
      .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // リンクデータをSVG要素に設定
    const link = g.selectAll('.link')
      .data(root.links(), d => {
        return d.target.id;
      });

    // リンクenter領域のSVG要素定義
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x(d => {
          return source.y0;
        })
        .y(d => {
          return source.x0;
        }));

    // リンクenter+update領域の設定
    const linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', d3.linkHorizontal()
        .x(d => {
          return d.y;
        })
        .y(d => {
          return d.x;
        }));

    // リンクexit領域の設定
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', d3.linkHorizontal()
        .x(d => {
          return source.y;
        })
        .y(d => {
          return source.x;
        }))
      .remove();

    // 次の動作のために現在位置を記憶
    node.each(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
})();


/**
 * pack 使い方
 * https://wizardace.com/d3-pack/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B", "value": 25 },
      {
        "name": "C",
        "children": [
          { "name": "D", "value": 10 },
          { "name": "E", "value": 15 },
          { "name": "F", "value": 10 }
        ]
      },
      { "name": "G", "value": 15 },
      {
        "name": "H",
        "children": [
          { "name": "I", "value": 20 },
          { "name": "J", "value": 10 }
        ]
      },
      { "name": "K", "value": 10 }
    ]
  };

  const width = 400;
  const height = 300;

  // 2.描画用のデータ変換
  const root = d3.hierarchy(data);
  root.sum(d => {
    return d.value;
  }); // value値を設定していないノードに、子孫ノードの合計value値を計算します。

  const pack = d3.pack()
    .size([width, height])
    .padding(0);

  pack(root);

  // SVG要素の配置
  const svg = d3.select('.body10')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const node = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('transform', d => {
      return `translate(${d.x}, ${d.y})`;
    });

  const color = ['orange', 'khaki', 'ivory'];

  node.append('circle')
    .attr('r', d => {
      return d.r;
    })
    .attr('stroke', 'black')
    .attr('fill', d => {
      return color[d.depth];
    });

  node.append('text')
    .style('text-anchor', d => {
      d.children ? 'end' : 'middle';
    })
    .attr('font-size', '150%')
    .text(d => {
      return d.children ? '' : d.data.name;
    });

})();


/**
 * treemap 使い方
 * https://wizardace.com/d3-treemap/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B", "value": 25 },
      {
        "name": "C",
        "children": [
          { "name": "D", "value": 10 },
          { "name": "E", "value": 15 },
          { "name": "F", "value": 10 }
        ]
      },
      { "name": "G", "value": 15 },
      {
        "name": "H",
        "children": [
          { "name": "I", "value": 20 },
          { "name": "J", "value": 10 }
        ]
      },
      { "name": "K", "value": 10 }
    ]
  };

  const width = 400;
  const height = 300;

  // 2.描画用のデータ変換
  const root = d3.hierarchy(data);
  root
    .sum(d => {
      return d.value;
    })
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });

  const treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

  treemap(root);

  // 3.SVG要素の配置
  const svg = d3.select('.body11')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.selectAll('.node')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => {
      return `translate(${d.x0}, ${d.y0})`;
    });

  g.append('rect')
    .style('width', d => {
      return d.x1 - d.x0;
    })
    .style('height', d => {
      return d.y1 - d.y0;
    })
    .style('fill', d => {
      while(d.depth > 1) d = d.parent;
      return d3.schemeCategory10[parseInt(d.value % 7)];
    })
    .style('opacity', .6);

  g.append('text')
    .attr('text-anchor', 'start')
    .attr('x', 5)
    .attr('dy', 30)
    .attr('font-size', '150%')
    .attr('class', 'node-label')
    .text(d => {
      return `${d.data.name} : ${d.value}`;
    });

})();


/**
 * partition 使い方
 * https://wizardace.com/d3-partation/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B", "value": 25 },
      {
        "name": "C",
        "children": [
          { "name": "D", "value": 10 },
          { "name": "E", "value": 15 },
          { "name": "F", "value": 10 }
        ]
      },
      { "name": "G", "value": 15 },
      {
        "name": "H",
        "children": [
          { "name": "I", "value": 20 },
          { "name": "J", "value": 10 }
        ]
      },
      { "name": "K", "value": 10 }
    ]
  };
  const width = 400;
  const height = 300;

  // 2.描画用のデータ変換
  const root = d3.hierarchy(data);
  root
    .sum(d => {
      return d.value;
    })
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });

  const partition = d3.partition()
    .size([height, width])
    .padding(1)
    .round(true);

  partition(root);

  // 3.SVG要素の配置
  const svg = d3.select('.body12')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => {
      return `translate(${d.y0}, ${d.x0})`;
    });

  g.append('rect')
    .style('width', d => {
      return d.y1 - d.y0;
    })
    .style('height', d => {
      return d.x1 - d.x0;
    })
    .style('fill', d => {
      while(d.depth > 1) d = d.parent;
      if(d.depth === 0) return 'gray';
      return d3.schemeCategory10[parseInt(d.value % 7)];
    })
    .style('opacity', .6);

  g.append('text')
    .attr('text-anchor', 'start')
    .attr('x', 5)
    .attr('dy', 30)
    .attr('font-size', '150%')
    .attr('class', 'node-label')
    .text(d => {
      return `${d.data.name} : ${d.value}`;
    });

})();


/**
 * サンバースト図の作り方
 * https://wizardace.com/d3-sunburst-base/
 */
(function() {
  // 1.データの準備
  const data = {
    "name": "A",
    "children": [
      { "name": "B", "value": 25 },
      {
        "name": "C",
        "children": [{ "name": "D", "value": 10 }, { "name": "E", "value": 15 }, { "name": "F", "value": 10 }]
      },
      { "name": "G", "value": 15 },
      {
        "name": "H",
        "children": [{ "name": "I", "value": 20 }, { "name": "J", "value": 10 }]
      },
      { "name": "K", "value": 10 }
    ]
  };
  const width = 800;
  const height = 600;
  const radius = Math.min(width, height) / 2;

  // 2.SVG表示用の設定
  const svg = d3.select('.body13')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

  // 3.描画用スケールの設定
  const colorScale = d3.scaleOrdinal()
    .range([
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ]);

  const rScale = d3.scaleLinear()
    .domain([0, radius])
    .range([.4 * radius, radius]);

  // 4.描画用のデータ変換
  const root = d3.hierarchy(data);
  root
    .sum(d => {
      return d.value;
    })
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });

  const partition = d3.partition()
    .size([2 * Math.PI, radius]);

  partition(root);

  // 5.SVG要素の設定
  const arc = d3.arc()
    .startAngle(d => {return d.x0;})
    .endAngle(d => {return d.x1;})
    .innerRadius(d => {return rScale(d.y0);})
    .outerRadius(d => {return rScale(d.y1);});

  g.selectAll('path')
    .data(root.descendants())
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('stroke', '#fff')
    .attr('fill', d => {
      while(d.depth > 1) d = d.parent;
      if(d.depth === 0) return 'lightgray';
      return colorScale(d.value);
    })
    .attr('opacity', .8)
    .append('title')
    .text(d => {
      return d.data.name + '\n' + d.value;
    });

  g.selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('fill', 'black')
    .attr('transform', d => {
      return `translate(${arc.centroid(d)})`;
    })
    .attr('dy', '5px')
    .attr('font', '10px')
    .attr('text-anchor', 'middle')
    .text(d => {
      return d.data.name;
    });
})();


/**
 * インタラクティブなサンバースト図の作り方
 * https://wizardace.com/d3-sunburst-zoom/
 * ⇒表示されないが、一旦終了
 */
(function() {
  // 1.描画用のデータ準備
  const width = 800;
  const height = 600;
  const radius = Math.min(width, height) / 2;
  centerRadius = .4 * radius;
  const backCircleRadius = .1 * radius;

  const data = {
    "name": "A",
    "children": [
      { "name": "B", "value": 25 },
      {
        "name": "C",
        "children": [{ "name": "D", "value": 10 }, { "name": "E", "value": 15 }, { "name": "F", "value": 10 }]
      },
      { "name": "G", "value": 15 },
      {
        "name": "H",
        "children": [{ "name": "I", "value": 20 }, { "name": "J", "value": 10 }]
      },
      { "name": "K", "value": 10 }
    ]
  };

  // 2.SVG表示用要素の設定
  const svg = d3.select('.body14')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const g = svg.append('g')
    .append('transform', `translate(${width / 2}, ${height / 2})`);

  // 3.描画用スケールの設定
  const colorScale = d3.scaleOrdinal()
    .range([
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ]);

  const xScale = d3.scaleLinear().range([0, 2 * Math.PI]);
  const rScale = d3.scaleLinear().range([.4 * radius, radius]);

  // 4.描画用のデータ変換
  const root = d3.hierarchy(data);
  root
    .sum(d => {
      return d.value;
    })
    .sort((a, b) => {
      return b.height - a.height || b.value - a.value;
    });

  const partition = d3.partition();
  partition(root);

  // 5.SVG要素の設定
  const arc = d3.arc()
    .startAngle(d => {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x0)));
    })
    .endAngle(d => {
      return Math.max(0, Math.min(2 * Math.PI, xScale(d.x1)));
    })
    .innerRadius(d => {
      return Math.max(0, rScale(d.y0));
    })
    .outerRadius(d => {
      return Math.max(0, rScale(d.y1));
    });

  g.selectAll('path')
    .data(root.descendants())
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('stroke', '#fff')
    .attr('fill', d => {
      while(d.depth > 1) d = d.parent;
      if(d.depth === 0) return 'lightgray';
      return colorScale(d.value);
    })
    .attr('opacity', .8)
    .on('click', click)
    .append('title')
    .text(d => {
      return `${d.data.name}\n${d.value}`;
    });

  g.selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('fill', 'black')
    .attr('transform', d => {
      return `translate(${arc.centroid(d)})`;
    })
    .attr('dy', '5px')
    .attr('font', '10px')
    .attr('text-anchor', 'middle')
    .on('click', click)
    .text(d => {
      return d.data.name;
    });

  // 6.クリック時のイベント関数
  function click(d) {
    const tween = g.transition()
      .duration(500)
      .tween('scale', () => {
        const xdomain = d3.interpolate(xScale.domain(), [d.x0, d.x1]);
        const ydomain = d3.interpolate(rScale.domein(), [d.y0, 1]);
        const yrange = d3.interpolate(rScale.range(), [d.y0 ? backCircleRadius : centerRadius, radius]);
        return (t) => {
          xScale.domain(xdomain(t));
          rScale.domain(ydomain(t)).range(yrange(t));
        };
      });

    tween.selectAll('path')
      .attrTween('d', d => {
        return () => {
          return arc(d)
        };
      });

    tween.selectAll('text')
      .attrTween('transform', d => {
        return () => {
          return `translate(${arc.centroid(d)})`;
        }
      })
      .attrTween('opacity', d => {
        return () => {
          return(xScale(d.x0) < 2 * Math.PI) && (xScale(d.x1) > 0.0) && (rScale(d.y1) > 0.0) ? 1.0 : 0;
        };
      })
      .attrTween('font', d => {
        return () => {
          return (xScale(d.x0) < 2 * Math.PI) && (xScale(d.x1) > 0.0) && (rScale(d.y1) > 0.0) ? '10px' : 1e-6;
        };
      });
  }
})();





/**
 */
(function() {
})();
