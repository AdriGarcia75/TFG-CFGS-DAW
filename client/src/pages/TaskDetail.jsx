import React, { useEffect, useState } from 'react';
import TaskDetailView from '../components/TaskDetailView';

export default function TaskDetail({ task, onClick, onTaskUpdate }) {
  const [title, setTitle] = useState(task.title || '');
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status || '');
  const [priority, setPriority] = useState(task.priority || '');
  const [dueDate, setDueDate] = useState(task.due_date?.slice(0, 10) || '');
  const [selectorOptions, setOptionsSelector] = useState(null);
  const [file, setFile] = useState(null);
  const [attachments, setAttachments] = useState(task.attachments || []);
  const [tags, setTags] = useState(task.tags?.map(t => t.id) || []);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    if (selectorOptions) return;

    const fetchOptionsSelector = async () => {
      try {
        const token = localStorage.getItem('token');
        const boardId = task.boardId;
        const res = await fetch(
          `http://localhost:3000/api/tasks/selectorOptions?boardId=${boardId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setOptionsSelector(data);
        if (task.columnId && data.status) {
          const statusObj = data.status.find(s => s.id === task.columnId);
          if (statusObj) setStatus(statusObj.name);
        }
      } catch (error) {
        console.error('Error al obtener los valores para los selectores', error);
      }
    };

    fetchOptionsSelector();
  }, [selectorOptions, task.boardId, task.columnId]);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/api/tags', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setAllTags(data);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };
    fetchAllTags();
  }, []);

  const fetchAttachments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:3000/api/tasks/${task.id}/attachments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setAttachments(data);
      }
    } catch (err) {
      console.error('Error fetching attachments:', err);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const selectedColumn = selectorOptions.status.find(s => s.name === status);
      const columnIdNum = selectedColumn ? selectedColumn.id : null;

      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'PATCH',
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
          columnId: columnIdNum,
          tagIds: tags,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Error al actualizar la tarea');
        return;
      }

      const updatedTask = await res.json();

      if (file) {
        const formData = new FormData();
        formData.append('attachment', file);

        const uploadRes = await fetch(
          `http://localhost:3000/api/tasks/${task.id}/attachments`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          alert(errorData.error || 'Error al subir archivo');
          return;
        }

        setFile(null);
        await fetchAttachments();
      }

      alert('Tarea actualizada correctamente');
      onTaskUpdate(updatedTask);
      onClick();
    } catch (err) {
      console.error(err);
      alert('Error de conexión al guardar ' + err);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [task.id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        onTaskUpdate({ deleted: true, id: task.id });
        onClick();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al eliminar la tarea');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al eliminar ' + err);
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
      handleDelete={handleDelete}
      onClick={onClick}
      attachments={attachments}
      file={file}
      setFile={setFile}
      tags={tags}
      setTags={setTags}
      allTags={allTags}
    />
  );
}
