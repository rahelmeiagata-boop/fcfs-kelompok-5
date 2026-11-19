import type { Segment } from '../types'

const processPalette = ['#10b7aa', '#f5a333', '#d9535d', '#3478b9', '#8a79bd', '#45977d', '#4b9eaa']
const idleColor = '#596d89'

export default function GanttChart({ segments }: { segments: Segment[] }) {
  if (!segments.length) return null

  const maxTime = Math.max(...segments.map((segment) => segment.end), 1)
  const ticks = Array.from(new Set(segments.flatMap((segment) => [segment.start, segment.end]))).sort((a, b) => a - b)

  return (
    <div className="gantt-wrap">
      <div className="gantt-caption">
        <span>WAKTU EKSEKUSI CPU</span>
        <span>{maxTime} satuan waktu</span>
      </div>

      <div className="gantt-timeline-scroll">
        <div className="gantt-timeline" role="img" aria-label="Diagram Gantt FCFS berdasarkan waktu kedatangan dan burst time proses">
          <div className="gantt-track">
            {segments.map((segment, index) => {
              const color = segment.type === 'idle'
                ? idleColor
                : processPalette[segments.filter((item, itemIndex) => item.type === 'process' && itemIndex <= index).length - 1] ?? processPalette[0]
              const width = (segment.duration / maxTime) * 100

              return (
                <div
                  className={`gantt-block ${segment.type === 'idle' ? 'gantt-block-idle' : ''}`}
                  key={`${segment.name}-${segment.start}-${index}`}
                  style={{ flexGrow: segment.duration, flexBasis: 0, backgroundColor: color }}
                  title={`${segment.name}: ${segment.start} sampai ${segment.end}`}
                >
                  {width >= 5 && <span>{segment.name}</span>}
                </div>
              )
            })}
          </div>

          <div className="gantt-ticks">
            {ticks.map((time) => (
              <span
                key={time}
                className="gantt-tick"
                style={{ left: `${(time / maxTime) * 100}%` }}
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
