import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from "@plasmohq/storage"
import List from "./list"

const Folder = (current) => {

    const [folders, setFolders] = useState([]);
    const [bookmarks, setBookmarks] = useState([{ fname: 'new', values: [] }]);
    const [newItem, setNewItem] = useState();
    // const navigate = useNavigate();
    const storage = new Storage()

    useEffect(
        () => {
            // fetch tasks from the local storage
            console.log("fetch storage")

            const fetch = async () => {
                await storage.get("folders").then(
                    (folders) => {
                        console.log(folders);
                        setFolders(folders || []);
                        // folders.map((folder)=>{
                        //     setBookmarks(bookmarks,{fname:folder,values:[]})
                        // })
                    },
                    // if there are no tasks, set an empty array
                    () => setFolders([])
                )
            }
            fetch()

        },
        // run once on mount
        []
    )

    const addFolder = async (name) => {
        { console.log(name.newItem) }
        setFolders([...folders, name.newItem]);
        await storage.set("folders", [...folders, name.newItem])

        console.log("Added details are")
        await storage.get("folders").then(
            (folders) => {
                console.log(folders);
            },
        )
    }

    const addbookmark = (index) => {
        console.log(index)
        console.log(current.current)
        setBookmarks(prevBookmarks => {
            console.log(prevBookmarks)
            prevBookmarks?.map((bookmark, ind) => {
                if (index === ind) {
                    return { ...prevBookmarks[ind], values: [...prevBookmarks[ind].values, current.current] }
                }
                else {
                    return bookmark
                }
            })
        })
    }
    const goToFolder = (folder) => {
        console.log("Clicked")
        return (<div>
            <h1>The list of bookmarks under</h1>
            <ul>
                {bookmarks?.map(bookmark => {
                    if (bookmark.fname === folder) {
                        <div>
                            <li>{ }</li>
                        </div>
                    }
                })}
            </ul>
        </div>)
    }
    const deleteFolder=(f) => {
        setFolders((currentfolder) => {
            return currentfolder.filter(folder => folder !== f)
        })
    }
    return (
        <div>
            <h1>Folders</h1>
            <ul>
                {folders.map((folder, i) => (
                    <div key={i}>
                        <li onClick={()=>goToFolder(folder)}>{folder}</li>
                        <button onClick={()=>addbookmark(i)}>+</button>
                        <button onClick={()=>deleteFolder(folder)}>Delete</button>
                    </div>
                ))}
            </ul>
            <div>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"
                />
                <button onClick={() => addFolder({ newItem })}>Add Folder</button>
            </div>
        </div>
    );
}

export default Folder;
