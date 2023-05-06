import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from "@plasmohq/storage"
import List from "./list"

const Folder = (current) => {

    // const [folders, setFolders] = useState([]);
    const [bookmarks, setBookmarks] = useState([{ fname: '', values: [] }]);
    const [newItem, setNewItem] = useState();
    // const navigate = useNavigate();
    const storage = new Storage()

    useEffect(
        () => {
            // fetch tasks from the local storage
            console.log("fetch storage")

            const fetch = async () => {
                await storage.get("newfolder").then(
                    (bookmarks) => {
                        console.log(bookmarks);
                        setBookmarks(bookmarks || []);
                        // folders.map((folder)=>{
                        //     setBookmarks(bookmarks,{fname:folder,values:[]})
                        // })
                    },
                    // if there are no tasks, set an empty array
                    () => setBookmarks([])
                )
            }
            fetch()

        },
        // run once on mount
        []
    )

    const addFolder = async (name) => {
        { console.log(name.newItem) }
        const updatedBookmarks=[...bookmarks, { fname: name.newItem, values: [] }];
        console.log(updatedBookmarks);
        setBookmarks(updatedBookmarks);
        await storage.set("newfolder",updatedBookmarks)

        console.log("Added details are")
        await storage.get("newfolder").then(
            (folders) => {
                console.log(folders);
            },
        )
    }

    const addbookmark = async (f) => {
        console.log(f)
        console.log(current.current)
        console.log(bookmarks)
        const index = bookmarks.findIndex((item) => item.fname === f);
        const updatedBookmarks = [
            ...bookmarks.slice(0, index),
            { ...bookmarks[index], values:[...bookmarks[index].values,current.current] },
            ...bookmarks.slice(index + 1)
        ];
        setBookmarks(updatedBookmarks);
        console.log(updatedBookmarks)
        await storage.set("newfolder", updatedBookmarks)
    }
    const goToFolder = (folder) => {
        console.log("Clicked")
        {
            bookmarks?.map(bookmark => {
                if (bookmark.fname === folder) {
                   console.log(bookmark.values)
                }
            })
        }
        // return (<div>
        //     <h1>The list of bookmarks under</h1>
        //     <ul>
        //         {bookmarks?.map(bookmark => {
        //             if (bookmark.fname === folder) {
        //                 <div>
        //                     <li>{ }</li>
        //                 </div>
        //             }
        //         })}
        //     </ul>
        // </div>)
    }
    const [selectedFname, setSelectedFname] = useState(null);

    const handleFnameClick = (fname) => {
        setSelectedFname(fname);
    };
    const deleteFolder = (f) => {
        setBookmarks((currentfolder) => {
            return currentfolder.filter(folder => folder.fname !== f)
        })
    }
    const deleteValue = async (fname, valueToDelete) => {
        // Find the bookmark object that matches the given fname
        const bookmarkToUpdate = bookmarks.find((bookmark) => bookmark.fname === fname);

        if (bookmarkToUpdate) {
            // Filter out the valueToDelete from the values array of the bookmark
            const updatedValues = bookmarkToUpdate.values.filter((value) => value !== valueToDelete);

            // Create a new array with the updated bookmark object
            const updatedBookmarks = bookmarks.map((bookmark) => {
                if (bookmark.fname === fname) {
                    return { ...bookmark, values: updatedValues };
                }
                return bookmark;
            });

            // Update the state and the storage
            setBookmarks(updatedBookmarks);
            await storage.set("newfolder", updatedBookmarks);
        }
    }

    return (
        <div>
            <h1>Folders</h1>
            <ul>
                {bookmarks.map((folder, i) => (
                    <div key={i}>
                        <li onClick={() => handleFnameClick(folder.fname)}>{folder.fname}</li>
                        <button onClick={() => addbookmark(folder.fname)}>+</button>
                        <button onClick={() => deleteFolder(folder.fname)}>Delete</button>
                    </div>
                ))}
            </ul>
            {selectedFname && (
                <div>
                    <h1>The list of bookmarks under {selectedFname}</h1>
                    <ul>
                        {bookmarks
                            .find((folder) => folder.fname === selectedFname)
                            .values.map((value,i) => (
                                <div key={i}>
                                <li ><a href={value}>{value}</a></li>
                                <button onClick={()=>deleteValue(selectedFname,value)}>Delete</button>
                                </div>
                            ))}
                    </ul>
                </div>
            )}
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
