import React from 'react';
import { Target, PieChart, Clock, ThumbsUp, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { SectionHeading } from '../SectionHeading';
import { FadeIn } from '../FadeIn';
export function CoreJudgmentSection() {
  return (
    <section aria-labelledby="core-judgment">
      <SectionHeading
        id="core-judgment"
        kicker="Core Judgment"
        title="核心判断"
        description="投资决策的核心结论：先观察，不追高。" />
      

      <FadeIn>
        <div className="grid sm:grid-cols-3 gap-4">
          <Card size="sm" className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="size-4 text-blue-700" aria-hidden="true" />
                <CardTitle className="text-sm">动作</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              暂不追高，列入观察；现价更接近「故事定价」而非价值。
            </CardContent>
          </Card>

          <Card size="sm" className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="size-4 text-blue-700" aria-hidden="true" />
                <CardTitle className="text-sm">仓位</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              观察仓 <span className="font-bold text-foreground">0%</span>
              ；若作为高风险转机押注，严格控制在{' '}
              <span className="font-bold text-foreground">0%-2%</span>。
            </CardContent>
          </Card>

          <Card size="sm" className="shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-blue-700" aria-hidden="true" />
                <CardTitle className="text-sm">持有周期</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              若买入，按{' '}
              <span className="font-bold text-foreground">3-5 年</span>{' '}
              代工/制程转折逻辑跟踪，高波动。
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Card size="sm" className="shadow-none border-emerald-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp
                  className="size-4 text-emerald-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-emerald-800">
                  核心理由
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">·</span>
                  18A 量产。
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">·</span>
                  美国本土先进制程稀缺性。
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">·</span>
                  政府/英伟达/软银入股降低破产风险。
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card size="sm" className="shadow-none border-red-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className="size-4 text-red-700"
                  aria-hidden="true" />
                
                <CardTitle className="text-sm text-red-800">最大风险</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold shrink-0">·</span>
                  估值已大幅领先基本面。
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600 font-bold shrink-0">·</span>
                  代工良率/外部客户兑现不及预期即触发剧烈回撤。
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </section>);

}