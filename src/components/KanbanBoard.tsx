import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  phase: string; // タスクが属するフェーズ
}

interface KanbanBoardProps {
  tasks: Task[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  // フェーズの定義 (UI設計ドキュメントを参考に)
  const phases = ["アイデア出し", "準備中", "進行中", "完了済み"];

  return (
    <div className="kanban-board">
      <h2 className="text-2xl font-bold mb-4">カンバンボード</h2>
      <div className="flex">
        {phases.map((phase) => (
          <div key={phase} className="kanban-phase w-1/4 p-4">
            <h3 className="text-lg font-semibold mb-2">{phase}</h3>
            <div className="kanban-tasks">
              {/* 各フェーズのタスクを表示 */}
              {tasks
                .filter((task) => task.phase === phase)
                .map((task) => (
                  <div key={task.id} className="kanban-task bg-white p-2 rounded shadow-sm mb-2">
                    <h4 className="text-sm font-semibold">{task.title}</h4>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
