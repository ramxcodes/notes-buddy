import RAG

query = 'a'
if __name__ == "__main__":
    # Load and index documents from the "notes" folder (run this once to index documents)
    RAG.load_and_index_documents('notes-buddy\\chatbot\\notes')
    convo = RAG.Conversation()

    while query!="exit":
        # Ask the user for a query input
        query = input("Please enter your query: ")

        # if query is exit then break
        if query.lower() == 'exit':
            break

        # add conversation to list
        convo.add_exchange_q(query)

        # Run RAG pipeline with the user input and capture the answer as a string
        generated_answer = RAG.run_rag_pipeline(query)

        # add conversation to list
        convo.add_exchange_o(generated_answer)
    
        # Output the result as a string
        result_string = f"Query: {query}\nGenerated Answer: {generated_answer}"
    
        # Print the result at the end
        print(result_string)

string = convo.conversation_history
with open("conversation.txt", 'a') as file:
    file.writelines(string)
    file.write("\n")