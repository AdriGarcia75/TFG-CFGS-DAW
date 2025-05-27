import React, { useEffect, useState } from 'react';
import TaskDetailView from '../components/TaskDetailView';

export default function TaskDetail({ task, onClick }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || '');
  const [priority, setPriority] = useState(task.priority || '');
  const [dueDate, setDueDate] = useState(task.due_date?.slice(0, 10) || '');

  const [selectorOptions, setOptionsSelector] = useState(null);

  useEffect(() => {
    if (selectorOptions) return;

    const fetchOptionsSelector = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/tasks/selectorOptions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOptionsSelector(data);
      } catch (error) {
        console.error('Error al obtener los valores para los selectores', error);
      }
    };

    fetchOptionsSelector();
  }, [selectorOptions]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          status,
          priority,
          due_date: dueDate,
        }),
      });

      if (res.ok) {
        alert('Tarea actualizada correctamente');
        onClick();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al actualizar la tarea');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al guardar');
    }
  };

  if (!selectorOptions) return null;

  return (
    <TaskDetailView
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      dueDate={dueDate}
      setDueDate={setDueDate}
      status={status}
      setStatus={setStatus}
      priority={priority}
      setPriority={setPriority}
      selectorOptions={selectorOptions}
      handleSave={handleSave}
      onClick={onClick}
    />
  );
}
