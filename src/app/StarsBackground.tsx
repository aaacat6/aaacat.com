'use client'

import { useEffect } from 'react'

// 定义一个星星组件
function Stars() {
  return (
    <div className="stars">
      {Array.from({ length: 100 }).map((_, i) => {
        const size = Math.random() * 2 + 1;
        const style = {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          '--opacity': Math.random() * 0.7 + 0.3,
          '--duration': `${Math.random() * 3 + 2}s`,
          '--delay': `${Math.random() * 2}s`,
        } as React.CSSProperties;
        
        return <div key={i} className="star" style={style} />;
      })}
    </div>
  );
}

// 客户端星星背景组件
export default function StarsBackground() {
  useEffect(() => {
    // 空的useEffect只是确保组件在客户端渲染
  }, []);
  
  return <Stars />;
} 