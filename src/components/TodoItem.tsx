import React from 'react';

interface TodoItemProps {
  id: number;
  task: string;
  startDate: string;
  expiringDate: string;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  task,
  startDate,
  expiringDate,
  onDelete,
}) => {
  return (
    <tr style={{ textAlign: 'left' }}>
      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
        <strong>{task}</strong>
      </td>
      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
        {startDate}
      </td>
      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
        {expiringDate}
      </td>
      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
        <button onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};