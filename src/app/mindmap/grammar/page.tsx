"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = {
  name: "Parts of Speech",
  children: [
    {
      name: "Noun",
      children: [
        {
          name: "Types of Nouns",
          children: [
            { name: "Proper Noun" },
            { name: "Common Noun" },
            { name: "Collective Noun" },
            { name: "Abstract Noun" },
          ],
        },
        {
          name: "Functions of Nouns",
          children: [
            { name: "Subject" },
            { name: "Object" },
            { name: "Predicate Nominative" },
          ],
        },
      ],
    },
    {
      name: "Adjective",
      children: [
        {
          name: "Types of Adjectives",
          children: [
            { name: "Descriptive" },
            { name: "Quantitative" },
            { name: "Demonstrative" },
          ],
        },
      ],
    },
    {
      name: "Verb",
      children: [
        {
          name: "Types of Verbs",
          children: [
            { name: "Action Verb" },
            { name: "Linking Verb" },
            { name: "Helping Verb" },
          ],
        },
        {
          name: "Tenses",
          children: [
            { name: "Present Tense" },
            { name: "Past Tense" },
            { name: "Future Tense" },
          ],
        },
      ],
    },
    {
      name: "Adverb",
      children: [
        { name: "Adverb of Time" },
        { name: "Adverb of Place" },
        { name: "Adverb of Manner" },
      ],
    },
    { name: "Pronoun" },
    { name: "Determiner" },
    { name: "Conjunction" },
    { name: "Preposition" },
    { name: "Interjection" },
  ],
};

const D3Mindmap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1600;
    const height = 3000; // 👈 tăng chiều cao tổng thể

    d3.select(svgRef.current).select("svg").remove();

    const rootY = 100;
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", `translate(${margin.left},${rootY})`);

    let i = 0,
      duration = 750;
    const root = d3.hierarchy(data, (d: { children: Iterable<{ name: string; children: ({ name: string; children: { name: string; children: { name: string; }[]; }[]; } | { name: string; children: { name: string; }[]; } | { name: string; children?: undefined; })[]; }> | null | undefined; }) => d.children);
    root.x0 = 0;
    root.y0 = 0;

    const colors = [
      "#e74c3c",
      "#f39c12",
      "#f1c40f",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#34495e",
      "#1abc9c",
      "#e67e22",
    ];

    const getColor = (d) => {
      if (d.depth === 0) return "#34495e";
      const firstLevelAncestor = d
        .ancestors()
        .find((ancestor: { depth: number; }) => ancestor.depth === 1);
      if (firstLevelAncestor) {
        const index = root.children.indexOf(firstLevelAncestor);
        return colors[index % colors.length];
      }
      return "#555";
    };

    // helper: wrap text
    function wrapText(text, width) {
      text.each(function () {
        const textEl = d3.select(this);
        const words = textEl.text().split(/\s+/).reverse();
        let line: any[] = [],
          lineNumber = 0,
          lineHeight = 1.1,
          y = textEl.attr("y"),
          dy = parseFloat(textEl.attr("dy"));
        let tspan = textEl
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
        let word;
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width - 20) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = textEl
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    function update(source) {
      const treeData = d3.tree().size([height, width])(root);
      const nodes = treeData.descendants().reverse();
      const links = treeData.descendants().slice(1);

      nodes.forEach((d) => {
        d.y = d.depth * 250;
      });

      const node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .on("click", click);

      nodeEnter
        .append("rect")
        .attr("class", "node-rect")
        .attr("width", 160)
        .attr("height", 50)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("x", -80)
        .attr("y", -25)
        .style("fill", "#fff")
        .style("stroke-width", "2px")
        .style("stroke", getColor);

      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text((d) => d.data.name)
        .call(wrapText, 150);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select(".node-rect")
        .style("fill", (d) => (d.depth === 0 ? "#2c3e50" : "#f0f0f0"))
        .style("stroke", getColor);

      nodeUpdate
        .select("text")
        .style("fill", (d) => (d.depth === 0 ? "white" : "#333"));

      node.exit()
        .transition()
        .duration(duration)
        .remove();

      const link = svg.selectAll("path.link").data(links, (d) => d.id);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return d3
            .linkHorizontal()
            .x((node: { y: any; }) => node.y)
            .y((node: { x: any; }) => node.x)({ source: o, target: o });
        })
        .attr("stroke", (d: any) => getColor(d))
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .merge(link)
        .transition()
        .duration(duration)
        .attr("d", (d: { parent: any; }) => {
          return d3
            .linkHorizontal()
            .x((node: { y: any; }) => node.y)
            .y((node: { x: any; }) => node.x)({ source: d.parent, target: d });
        });

      link.exit().transition().duration(duration).remove();

      nodes.forEach((d: { x0: any; x: any; y0: any; y: any; }) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function click(_event: any, d: { children: null; _children: null; }) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }

    update(root);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 bg-[#F5F5DC] min-h-screen">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 font-inter">
        Grammar Mindmap
      </h1>

      {/* Khung mindmap có scroll riêng */}
      <div className="relative w-full max-h-[800px] overflow-auto bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <style jsx>{`
          .node text {
            font-family: sans-serif;
            fill: #333;
            font-weight: 500;
          }
          .node-rect {
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
          }
          .node-rect:hover {
            transform: scale(1.05);
          }
          .link {
            fill: none;
            stroke-width: 2px;
          }
        `}</style>
        <div ref={svgRef}></div>
      </div>
    </main>
  );
};

export default D3Mindmap;
