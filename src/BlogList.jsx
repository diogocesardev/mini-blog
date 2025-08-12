import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import Filter from "./Filter";

const BlogList = ({ blogs, title }) => {
    const [search, setSearch] = useState('');

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="blog-list">
            <Filter
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder={"Search blogs by title or author"}
             />
            <h2>{title}</h2>
            {filteredBlogs.map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h2>{blog.title}</h2>
                            <p>Written by {blog.author}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
}

export default BlogList;