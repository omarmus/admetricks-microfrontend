/* eslint-disable */

import * as d3 from 'd3'

interface Params {
  x: (value: never, index: number, iterable: Iterable<never>) => unknown
  y: (value: never, index: number, iterable: Iterable<never>) => unknown
  f: (value: never, index: number, iterable: Iterable<never>) => unknown
  title: string
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  width: number
  height: number
  xDomain: any
  xRange: [number, number]
  yType: any
  yDomain: unknown[]
  fDomain: unknown[]
  yRange: [number, number]
  xPadding: number
  yFormat: number
  fFormat: number
  colors: [string, string]
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bar-chart
function BarChart(data: [], {
  x = (d: unknown, i: number) => i, // given d in data, returns the (ordinal) x-value
  y = (d: unknown) => d, // given d in data, returns the (quantitative) y-value
  f = (d: unknown) => d, // given d in data, returns the (quantitative) y-value
  title = '', // given d in data, returns the title text
  marginTop = 20, // the top margin, in pixels
  marginRight = 0, // the right margin, in pixels
  marginBottom = 30, // the bottom margin, in pixels
  marginLeft = 40, // the left margin, in pixels
  width = 640, // the outer width of the chart, in pixels
  height = 400, // the outer height of the chart, in pixels
  xDomain, // an array of (ordinal) x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  yType = d3.scaleLinear, // y-scale type
  yDomain, // [ymin, ymax]
  fDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  xPadding = 0.1, // amount of x-range to reserve to separate bars
  yFormat, // a format specifier string for the y-axis
  fFormat, // a format specifier string for the y-axis
  colors = ['#5ec0bc', '#f4bd6a']
}: Params) {
  // debugger
  // Compute values.
  const X = d3.map(data, x)
  const Y = d3.map(data, y)
  const F = d3.map(data, f)
  const Color = colors

  // Compute default domains, and unique the x-domain.
  if (xDomain === undefined) xDomain = X
  if (yDomain === undefined) yDomain = [0, d3.max(Y as Iterable<string>)]
  if (fDomain === undefined) fDomain = [0, d3.max(F as Iterable<string>)]
  xDomain = new d3.InternSet(xDomain)

  // Omit any data not present in the x-domain.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]))

  // Construct scales, axes, and formats.
  const xScale: any = d3.scaleBand(xDomain as Iterable<{toString(): string;}>, xRange).padding(xPadding)
  const yScale = yType(yDomain, yRange)
  const fScale = yType(fDomain, yRange)
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0)
  const yAxis = d3.axisRight(yScale).ticks(height / 40, yFormat)
  const fAxis = d3.axisLeft(fScale).ticks(height / 60, fFormat)

  const topFrecuency = 25

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height + 40)
    .attr("viewBox", [0, 0, width, height + 40])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick text")
      .attr("fill", "#909090"))
    .call(g => g.selectAll(".tick line").remove())
  
  svg.append("g")
    .attr("transform", `translate(${width - 15},${topFrecuency})`)
    .call(fAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick text")
      .attr("fill", "#909090"))
    .call(g => g.selectAll(".tick:nth-child(1) text")
      .attr("fill", "#ffffff"))
    .call(g => g.selectAll(".tick line").remove())
  
  svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("fill", i => Color[i])
      .attr("x", i => xScale(X[i]))
      .attr("y", i => yScale(Y[i]))
      .attr("height", i => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth())

  svg.append("line")
    .attr("x1", i => xScale(X[0]) + xScale.bandwidth() / 2)
    .attr("y1", i => fScale(F[0]) + topFrecuency)
    .attr("x2", i => xScale(X[1]) + xScale.bandwidth() / 2)
    .attr("y2", i => fScale(F[1]) + topFrecuency)
    .attr("stroke-width", 3)
    .attr("stroke", '#648db7')
  
  svg.append("g")
    .selectAll("rect")
    .data(I)
    .join("circle")
      .attr("stroke", '#648db7')
      .attr("fill", 'white')
      .attr("stroke-width", 2)
      .attr("cx", i => xScale(X[i]) + xScale.bandwidth() / 2)
      .attr("cy", i => fScale(F[i]) + topFrecuency)
      .attr("r", 6)
  
  svg.append("g")    
    .selectAll("rect")
    .data(I)
    .join("text")
      .text(i => F[i] as string)
      .attr("x", i => xScale(X[i]) + xScale.bandwidth() / 2)
      .attr("y", i => fScale(F[i]) - 12 + topFrecuency)
      .attr("font-size", 11)
      .attr("font-weight", 'bold')

  svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)      
    .call(xAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick text")
      .attr("transform", `translate(0, 5) rotate(-15)`))
    .call(g => g.selectAll(".tick line").remove())

  svg.append("rect")
    .attr("transform", `translate(0,30)`)
    .attr("fill", '#5682b0')
    .attr("x", width / 2 - 80)
    .attr("y", height - 10)
    .attr("height", 8)
    .attr("width", 30)

  svg.append("text")
    .attr("transform", `translate(0,30)`)
    .text('Alcance')
    .attr("font-family", "sans-serif")
    .attr("x", i => width / 2 - 45)
    .attr("y", i => height - 2)
    .attr("font-size", 11)

  svg.append("circle")
    .attr("transform", `translate(0,30)`)
    .attr("stroke", '#648db7')
    .attr("fill", 'white')
    .attr("stroke-width", 2)
    .attr("cx", i => width / 2 + 50)
    .attr("cy", i => height - 6)
    .attr("r", 4)

  svg.append("text")
    .attr("transform", `translate(0,30)`)
    .text('Frecuencia')
    .attr("font-family", "sans-serif")
    .attr("x", i => width / 2 + 60)
    .attr("y", i => height - 2)
    .attr("font-size", 11)

  return svg.node()
}

export default BarChart
