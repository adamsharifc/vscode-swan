#include <iostream>
#include <fstream>

int main(int argc, char* argv[]) {
    int lineCount = 0;
    std::string line;

    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <file_path>" << std::endl;
        return 1;
    }

    std::ifstream file(argv[1], std::ios::binary | std::ios::ate);
    if (!file.is_open()) {
        std::cerr << "Error: Could not open file " << argv[1] << std::endl;
        return 1;
    }

    std::streamsize fileSize = file.tellg();
    file.seekg(0, std::ios::beg);

    while (std::getline(file, line)) {
        lineCount++;
    }

    std::cout << "File size: " << fileSize << " bytes" << std::endl;
    std::cout << "Number of lines: " << lineCount << std::endl;

    return 0;
}