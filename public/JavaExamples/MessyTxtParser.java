/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package javaapplication1;

import java.io.*;

/**
 *
 * @author jakey
 */
public class MessyTxtParser { //Path is at C:\Users\jakey\OneDrive\Documents\NetBeansProjects\JavaApplication1 if you want to use it to make more text

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        // TODO code application logic here
        String finalParsedText = "";
        File file = new File("C:\\Users\\jakey\\OneDrive\\Documents\\NetBeansProjects\\MessyTxtParser\\src\\MessyTxtParser\\sentences.txt");
        
        BufferedReader br = new BufferedReader(new FileReader(file));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
            sb.append(System.lineSeparator()); // Add a newline separator
        }
        line = sb.toString();
        line = line.replace("”", "\"");
        line = line.replace("“", "\"");
        line = line.replace("  ", " ");
        line = line.replace("	", "");
        line = line.replace("gook", "slur word");
        line = line.replace("gooks", "slur words");
        line = line.replace("?", "?."); // then we can also keep ? as sentences
        line = line.replace("!", "!.");
        line = line.replace("’", "'");
        line = line.trim();
        br.close();
        String[] sentences = line.split("(?<!Mrs|mrs|mr|Mr|miss|Ms|ms|Miss|[.]|al|(\\(p)|U\\.S|U|A|, p)[.](?![.]|(” \\()|\\\"|\\d)"); //https://regex101.com/r/mR89S6/1 test your regex function here!
        for (String sentence : sentences) {
            sentence = sentence.trim();
            sentence = sentence.replace("!.", "!");
            sentence = sentence.replace("?.", "!");
            if (sentence.substring(sentence.length() - 1).equals("!") | sentence.substring(sentence.length() - 1).equals("?")) {
                System.out.println(sentence + " ");
            } else {
                System.out.println(sentence + ". ");
            }
        }
    }

}
