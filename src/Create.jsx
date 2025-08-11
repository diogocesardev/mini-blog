import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

       fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)})
        .then(() => {
            console.log('New blog added');
            setIsPending(false);
            history.push('/');
        })
        .catch(err => {
            console.error('Error adding blog:', err);
        });
    }

    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form>
                <label>Blog Title</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body</label>
                <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                />
                <label>Blog author: </label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Alex Johnson">Alex Johnson</option>
                    <option value="Maria Silva">Maria Silva</option>
                    <option value="Lucas Pereira">Lucas Pereira</option>
                </select>
                {!isPending && <button onClick={handleSubmit}>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;