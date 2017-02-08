import React from 'react'
import * as d3 from 'd3'

export class PollResultPie extends React.Component {
  constructor (props) {
    super(props)
    this.renderPie = this.renderPie.bind(this)
  }
  componentDidMount () {
    this.renderPie(this.props.options)
  }
  renderPie (d) {
    const container = document.querySelector('.pie-chart')
    const tooltip = document.querySelector('.pie-chart--tool-tip')
    const size = container.offsetWidth
    const radius = size / 2.5
    const chart = d3.select('.pie-chart')
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')
      .attr('transform', 'translate(' + (size / 2) + ', ' + (size / 2) + ')')
    const arc = d3.arc()
      .innerRadius(radius / 3)
    const pie = d3.pie()
      .value((d) => d.count)
      // .padAngle(0.03)
    const colors = d3.scaleOrdinal(d3.schemeCategory20)
    const paths = chart.selectAll('.arc')
      .data(pie(d))
    paths.exit().remove()
    paths.enter().append('g')
      .attr('class', 'arc')
      .merge(paths)
        .append('path')
        .each((d) => { d.outerRadius = radius })
        .attr('d', arc)
        .attr('fill', (d) => colors(d.data.item))
        .on('mouseover', (d) => {
          arcTween(radius + 20, 0)
          updateTooltipLocation(d3.event)
          tooltip.textContent = d.data.item + ': ' + d.data.count
          tooltip.classList.add('active')
        })
        .on('mouseleave', () => {
          arcTween(radius, 150)
          tooltip.classList.remove('active')
        })
        .on('mousemove', (d) => {
          updateTooltipLocation(d3.event)
        })
    function arcTween (radius, delay) {
      d3.select(d3.event.target).transition().delay(delay)
        .attrTween('d', (d) => {
          let j = d3.interpolateNumber(d.outerRadius, radius)
          return (t) => {
            d.outerRadius = j(t)
            return arc(d)
          }
        })
    }
    function updateTooltipLocation (e) {
      tooltip.style.transform = 'translate(' + e.layerX + 'px,' + (e.layerY - 60) + 'px)'
    }
  }
  render () {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='pie-chart' />
          <div className='pie-chart--tool-tip' />
        </div>
      </div>
    )
  }
}

PollResultPie.propTypes = {
  options: React.PropTypes.array.isRequired
}

export default PollResultPie
