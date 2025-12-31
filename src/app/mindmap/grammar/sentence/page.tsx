"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

interface NodeData {
  name: string;
  children?: NodeData[] | null;
  _children?: NodeData[] | null;
}

interface HierarchyPointNodeWithId extends d3.HierarchyPointNode<NodeData> {
  id?: string;
  x0?: number;
  y0?: number;
  _children?: this["children"];
}

type HLink = d3.HierarchyPointLink<NodeData>;

const data: NodeData = {
  name: "WORD CLASSES",
  children: [
    {
      name: "NOUN (N)",
      children: [
        { name: "Proper: London, Vy" },
        { name: "Common: City, App" },
        { name: "Abstract: Love, Goal" },
        { name: "Collective: Team, Staff" },
      ],
    },
    {
      name: "VERB (V)",
      children: [
        { name: "Action: Run, Code" },
        { name: "Stative: Know, Believe" },
        { name: "Auxiliary: Be, Do, Have" },
        { name: "Modal: Can, Must, Will" },
      ],
    },
    {
      name: "ADJECTIVE (ADJ)",
      children: [
        { name: "Descriptive: Big, Blue" },
        { name: "Quantitative: Many, Few" },
        { name: "Demonstrative: This, That" },
      ],
    },
    {
      name: "ADVERB (ADV)",
      children: [
        { name: "Manner: Quickly, Well" },
        { name: "Time: Now, Today" },
        { name: "Place: Here, There" },
      ],
    },
    {
      name: "PRONOUN (PRO)",
      children: [
        { name: "Personal: I, You, He" },
        { name: "Possessive: Mine, Yours" },
        { name: "Relative: Who, Which" },
      ],
    },
    { name: "PREPOSITION (PREP)" },
    { name: "CONJUNCTION (CONJ)" },
    { name: "INTERJECTION (INT)" },
  ],
};

const D3Mindmap: React.FC = () => {
  // Khai báo ref cho phần tử HTMLDivElement
  const svgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Thoát nếu ref chưa được gắn vào DOM
    if (!svgRef.current) return;

    // Kích thước và lề của sơ đồ
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1600;
    const height = 3000;
    const duration = 750;

    // Xóa SVG cũ để vẽ lại
    d3.select(svgRef.current).select("svg").remove();

    // Chọn container và thêm SVG vào bên trong
    const container = d3.select(svgRef.current);
    const rootY = 100;
    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", `translate(${margin.left},${rootY})`);

    // Tạo cấu trúc phân cấp cho D3 và ép kiểu
    const root = d3.hierarchy<NodeData>(data, (d) => d.children) as HierarchyPointNodeWithId;

    // Gán một ID duy nhất cho mỗi node ngay từ đầu
    let idCounter = 0;
    root.each((node) => {
      (node as HierarchyPointNodeWithId).id = `node-${++idCounter}`;
    });

    // Khởi tạo vị trí gốc
    root.x0 = 0;
    root.y0 = 0;

    // color
    const getColor = (d: HierarchyPointNodeWithId) => {
      if (d.depth === 0) return "#505252";
      if (d.depth === 1) return "#7e8b43"; // Màu rêu
      return "#ff98a2"; // Màu hồng
    };

    const click = (_event: MouseEvent, d: HierarchyPointNodeWithId) => {
      if (d.children) {
        d._children = d.children;
        d.children = undefined;
      } else {
        d.children = d._children;
        d._children = undefined;
      }
      update(d);
    };

    function update(source: HierarchyPointNodeWithId) {
      const treeData = d3.tree<NodeData>().size([height, width])(root);
      const nodes = treeData.descendants().reverse() as HierarchyPointNodeWithId[];
      const links = root.links();

      nodes.forEach((d) => {
        d.y = d.depth * 280; // Khoảng cách ngang rộng cho chữ bự
      });

      const node = svg.selectAll<SVGGElement, HierarchyPointNodeWithId>("g.node")
        .data(nodes, (d) => d.id as string);

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", `translate(${source.y0},${source.x0})`)
        .on("click", click);

      // Rect bự hơn theo ý bạn
      nodeEnter
        .append("rect")
        .attr("class", "node-rect shadow-lg")
        .attr("width", 220)
        .attr("height", 60)
        .attr("rx", 30)
        .attr("ry", 30)
        .attr("x", -110)
        .attr("y", -30)
        .style("fill", "#fff")
        .style("stroke-width", "4px")
        .style("stroke", getColor);

      // Chữ bự 14px
      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("class", "font-black uppercase tracking-tight")
        .style("font-size", "14px")
        .style("pointer-events", "none")
        .text((d) => d.data.name);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select(".node-rect")
        .style("fill", (d) => (d.depth === 0 ? "#505252" : "#fff"))
        .style("stroke", getColor);

      nodeUpdate
        .select("text")
        .style("fill", (d) => (d.depth === 0 ? "white" : "#505252"));

      node.exit()
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .remove();

      const linkGenerator = d3.linkHorizontal<HLink, HierarchyPointNodeWithId>()
          .x(node => node.y)
          .y(node => node.x);

      const link = svg.selectAll<SVGPathElement, HLink>("path.link")
        .data(links, (d) => (d.target as HierarchyPointNodeWithId).id as string);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("stroke", (d) => getColor(d.target as HierarchyPointNodeWithId))
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "5,5")
        .attr("fill", "none")
        .attr("d", (d) => {
          const typedD = d as HLink;
          const tmpLink: HLink = { source: typedD.source, target: typedD.source };
          return linkGenerator(tmpLink) ?? null;
        })
        .merge(link)
        .transition()
        .duration(duration)
        .attr("d", (d) => linkGenerator(d as HLink) ?? null);

      link.exit().transition().duration(duration)
        .attr("d", (d) => {
            const typedD = d as HLink;
            const tmpLink: HLink = { source: typedD.source, target: typedD.source };
            return linkGenerator(tmpLink) ?? null;
        })
        .remove();

      root.eachBefore((d) => {
        const node = d as HierarchyPointNodeWithId;
        node.x0 = node.x;
        node.y0 = node.y;
      });
    }

    update(root);
  }, []);

  return (
    <main className="min-h-screen bg-[#fdfff2] py-20 px-6 flex flex-col items-center">
      <div className="max-w-7xl w-full text-center">
        <Link href="/" className="inline-flex items-center text-[#7e8b43] font-black uppercase tracking-widest text-[10px] mb-8 hover:gap-3 transition-all">
          ← Back to Dashboard
        </Link>
        <h1 className="text-5xl md:text-6xl font-black text-[#505252] mb-4 uppercase tracking-tighter">
          Grammar Mindmap
        </h1>
        <p className="text-[#7e8b43] font-bold italic mb-12">Visualizing English Word Classes</p>
        
        {/* SỬ DỤNG ĐÚNG CẤU TRÚC CONTAINER CỦA BẠN */}
        <div className="relative w-full max-h-[700px] overflow-auto bg-white p-4 rounded-[50px] shadow-2xl border-4 border-dashed border-[#d4e7b8] custom-scrollbar">
          <div ref={svgRef} className="inline-block"></div>
        </div>

        {/* NỘI DUNG PHÍA DƯỚI - KHÔNG CÒN BỊ MẤT */}
        <div className="mt-12 flex flex-col items-center gap-6 pb-20">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
             Tip: Scroll to explore • Click nodes to expand
          </p>
          <div className="flex gap-8">
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#505252]"></div>
                <span className="text-[11px] font-bold text-gray-600 uppercase">Root</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#7e8b43]"></div>
                <span className="text-[11px] font-bold text-gray-600 uppercase">Class</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#ff98a2]"></div>
                <span className="text-[11px] font-bold text-gray-600 uppercase">Examples</span>
             </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .node-rect { transition: all 0.3s ease; }
        .node:hover .node-rect { transform: scale(1.05); filter: brightness(0.95); }
        .link { stroke-opacity: 0.5; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 12px; height: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f9fbf2; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #d4e7b8; 
          border-radius: 20px; 
          border: 3px solid #fff; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7e8b43; }
      `}</style>
    </main>
  );
};

export default D3Mindmap;