import React from "react";
import { InputGroup, Modal, FormControl, Card, Button, Image } from "react-bootstrap";

export default class NoteEditor extends React.Component{
    state = {
        noteTitle: "",
        noteInfo: "",
        noteKeyword: "",
        noteMedia: "holder.js/100px250", //not sure how to store the media yet
    }

    constructor(props){
        super(props);
        const title = props.title;
        const info = props.info;
        const keyword = props.keyword;
        const media = props.media;
    }
    hideModal = () => {
        const {controlShow} = this.props;
        controlShow(false);
    }

    noteSaved = () => {
        const{noteTitle, noteInfo, noteKeyword, noteMedia} = this.state;
        const oldNote = [...noteTitle, noteInfo, noteKeyword, noteMedia];
        this.setState({noteTitle: noteTitle, noteInfo: noteInfo, noteKeyword: noteKeyword, noteMedia: noteMedia});
    }

    titleChange = (event) => this.setState({noteTitle: event.target.value});

    infoChange = (event) => this.setState({noteInfo: event.target.value});

    keywordChange = (event) => this.setState({noteKeyword: event.target.value});

    render(){
        const {show} = this.props;
        const{noteTitle, noteInfo, noteKeyword, noteMedia} = this.state;

        return(
            console.log("\n\nNote title: ",noteTitle,"\nNote Info: ",noteInfo,"\nNoteKeyword: ",noteKeyword),
            <div style = {{textAlign: "right"}}>
                <Modal show={show} onHide={this.hideModal} size="1g" centered>
                    <Modal.Header closeButton>
                        <h2>{noteTitle}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="note-editor">
                            <Card>
                                <Button variant="secondary">Add Media (PDF and Images are supported)</Button>
                                <Card.Body>
                                    <Card.Title>
                                        <InputGroup>
                                            <FormControl 
                                            aria-label="Type your note title here" 
                                            placeholder="Untitled Note"
                                            defaultValue={noteTitle}
                                            onChange={this.titleChange}
                                            />
                                        </InputGroup>
                                    </Card.Title>
                                    <InputGroup>
                                        <FormControl 
                                        style={{height: 200}}
                                        as="textarea" 
                                        aria-label="Type your note here" 
                                        placeholder="Type your note here"
                                        defaultValue={noteInfo}
                                        onChange={this.infoChange}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <FormControl
                                        as="textarea"
                                        aria-label="Type your keywords here"
                                        placeholder="Add keywords..."
                                        defaultValue={noteKeyword}
                                        onChange={this.keywordChange}
                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Card>
                            
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}