#Derived from https://github.com/tsmango/jekyll_alias_generator/
module Jekyll
  
  class CategoryGenerator < Generator
    def generate(site)
      @site = site

      generate_redirects
    end
    
    def generate_redirects
      @site.posts.each do |post|
        generate_redirect('blog', post.url)
      end
    end
    
    def generate_redirect(oldPath, url)
      redirect_dir = File.extname(url).empty? ? url : File.dirname(url)
      redirect_file = File.extname(url).empty? ? "index.html" : File.basename(url)

      redirect_dir = File.join(oldPath, redirect_dir)
      
      fs_path_to_dir = File.join(@site.dest, redirect_dir)
      alias_index_path = File.join(redirect_dir, redirect_file)

      FileUtils.mkdir_p(fs_path_to_dir)

      File.open(File.join(fs_path_to_dir, redirect_file), 'w') do |file|
        file.write(redirect_template(url))
      end
      
      (alias_index_path.split('/').size + 1).times do |sections|
        @site.static_files << Jekyll::RedirectFile.new(@site, @site.dest, alias_index_path.split('/')[0, sections].join('/'), nil)
      end
    end
    
    def redirect_template(target)
      <<-EOF
<!DOCTYPE html>
<html>
    <head>
        <link rel="canonical" href="#{target}"/>
        <meta http-equiv=refresh content="0; url=#{target}" />
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <title>Redirecting to new location...</title>

        <script type="text/javascript"> function delayer() {window.location = "#{target}"} </script>
    </head>

    <body onLoad="setTimeout('delayer()', 1000)">
        <h1>Redirecting to new location...</h1>
    </body>
</html>
      EOF
    end
  end
  
  class RedirectFile < StaticFile
    require 'set'

    def destination(dest)
      File.join(dest, @dir)
    end

    def modified?
      return false
    end

    def write(dest)
      return true
    end
  end
end