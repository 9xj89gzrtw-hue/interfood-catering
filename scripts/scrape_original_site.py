#!/usr/bin/env python3
"""
Scrape and extract ALL content from interfood-catering.ru
"""

import json
import re
import os
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE_URL = "https://interfood-catering.ru"
OUTPUT_FILE = "/home/z/my-project/scripts/original_site_full_content.json"

# Page mappings
PAGES = {
    "main": "/tmp/interfood_main.html",
    "menu": "/tmp/interfood_menu.html",
    "about": "/tmp/interfood_about.html",
    "services": "/tmp/interfood_services.html",
    "wedding": "/tmp/interfood_wedding.html",
    "corporate": "/tmp/interfood_corporate.html",
    "contacts": "/tmp/interfood_contacts.html",
    "reviews": "/tmp/interfood_reviews.html",
    "furshet": "/tmp/interfood_furshet.html",
    "banket": "/tmp/interfood_banket.html",
    "coffee_break": "/tmp/interfood_coffee.html",
    "faq": "/tmp/interfood_faq.html",
    "company": "/tmp/interfood_company.html",
    # Additional pages found
    "obedy": "/tmp/interfood_obedy.html",
    "novogodnij": "/tmp/interfood_novogodnij.html",
    "mobilnyj": "/tmp/interfood_mobilnyj.html",
    "vyezdnoy": "/tmp/interfood_vyezdnoy.html",
    "shatr": "/tmp/interfood_shatr.html",
    "teploxod": "/tmp/interfood_teploxod.html",
    "zaly": "/tmp/interfood_zaly.html",
    "torty": "/tmp/interfood_torty.html",
    "shokolad": "/tmp/interfood_shokolad.html",
    "piramidy": "/tmp/interfood_piramidy.html",
    "floristika": "/tmp/interfood_floristika.html",
    "vyezrestoran": "/tmp/interfood_vyezrestoran.html",
    "registraciya": "/tmp/interfood_registraciya.html",
    "svadba": "/tmp/interfood_svadba.html",
    "foto": "/tmp/interfood_foto.html",
}

all_images = set()
all_videos = set()

def load_page(filepath):
    """Load and parse an HTML page."""
    if not os.path.exists(filepath):
        print(f"  WARNING: File not found: {filepath}")
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        return BeautifulSoup(f.read(), 'html5lib')

def extract_text(soup, selector=None):
    """Extract visible text from a soup or element."""
    if selector:
        el = soup.select_one(selector)
        if not el:
            return ""
        target = el
    else:
        target = soup
    
    # Remove script and style elements
    for tag in target.find_all(['script', 'style', 'noscript']):
        tag.decompose()
    
    text = target.get_text(separator='\n', strip=True)
    # Clean up multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def extract_images(soup, base_url=BASE_URL):
    """Extract all image URLs from the page."""
    images = []
    for img in soup.find_all('img'):
        src = img.get('src', '') or img.get('data-src', '') or img.get('data-lazy-src', '')
        if src:
            full_url = urljoin(base_url, src)
            images.append({
                'src': full_url,
                'alt': img.get('alt', ''),
                'title': img.get('title', '')
            })
            all_images.add(full_url)
    
    # Also check for background images in inline styles
    for el in soup.find_all(style=True):
        style = el.get('style', '')
        urls = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', style)
        for url in urls:
            full_url = urljoin(base_url, url)
            images.append({
                'src': full_url,
                'alt': '',
                'title': 'background'
            })
            all_images.add(full_url)
    
    # Check for picture/source elements
    for source in soup.find_all('source'):
        srcset = source.get('srcset', '')
        if srcset:
            for part in srcset.split(','):
                url = part.strip().split()[0]
                full_url = urljoin(base_url, url)
                images.append({
                    'src': full_url,
                    'alt': '',
                    'title': 'picture-source'
                })
                all_images.add(full_url)
    
    return images

def extract_videos(soup, base_url=BASE_URL):
    """Extract all video URLs."""
    videos = []
    for video in soup.find_all('video'):
        src = video.get('src', '')
        if src:
            full_url = urljoin(base_url, src)
            videos.append({'src': full_url})
            all_videos.add(full_url)
        for source in video.find_all('source'):
            src = source.get('src', '')
            if src:
                full_url = urljoin(base_url, src)
                videos.append({'src': full_url})
                all_videos.add(full_url)
    
    # Check for iframe videos (YouTube, Vimeo)
    for iframe in soup.find_all('iframe'):
        src = iframe.get('src', '')
        if 'youtube' in src or 'vimeo' in src or 'video' in src:
            videos.append({'src': src, 'type': 'iframe'})
    
    return videos

def extract_links(soup, base_url=BASE_URL):
    """Extract all links from the page."""
    links = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        full_url = urljoin(base_url, href)
        links.append({
            'href': full_url,
            'text': a.get_text(strip=True),
            'internal': 'interfood-catering.ru' in full_url
        })
    return links

def extract_sections(soup):
    """Extract content organized by sections."""
    sections = []
    
    # Look for common section patterns
    section_tags = soup.find_all(['section', 'article'])
    
    # Also look for div-based sections
    section_divs = soup.find_all('div', class_=re.compile(r'(section|block|hero|banner|content-area|row)', re.I))
    
    all_sections = section_tags + section_divs
    
    for sec in all_sections:
        # Get the heading
        heading = ""
        for h in sec.find_all(['h1', 'h2', 'h3', 'h4']):
            heading = h.get_text(strip=True)
            break
        
        text = sec.get_text(separator=' ', strip=True)
        if len(text) > 20:  # Only include sections with meaningful content
            sections.append({
                'heading': heading,
                'text': text[:2000]  # Limit text length
            })
    
    return sections

def parse_page(name, filepath):
    """Parse a single page and extract all content."""
    print(f"  Parsing: {name}")
    soup = load_page(filepath)
    if not soup:
        return None
    
    result = {
        'title': '',
        'meta_description': '',
        'text': '',
        'images': [],
        'videos': [],
        'links': [],
        'sections': [],
        'structured_content': {}
    }
    
    # Title
    title_tag = soup.find('title')
    if title_tag:
        result['title'] = title_tag.get_text(strip=True)
    
    # Meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc:
        result['meta_description'] = meta_desc.get('content', '')
    
    # Meta keywords
    meta_kw = soup.find('meta', attrs={'name': 'keywords'})
    if meta_kw:
        result['meta_keywords'] = meta_kw.get('content', '')
    
    # Full text content
    result['text'] = extract_text(soup, 'body') if soup.find('body') else extract_text(soup)
    
    # Images
    result['images'] = extract_images(soup)
    
    # Videos
    result['videos'] = extract_videos(soup)
    
    # Links
    result['links'] = extract_links(soup)
    
    # Sections
    result['sections'] = extract_sections(soup)
    
    # Extract specific structured content based on page type
    if name == 'contacts':
        result['structured_content'] = parse_contacts(soup)
    elif name == 'faq':
        result['structured_content'] = parse_faq(soup)
    elif name in ('reviews',):
        result['structured_content'] = parse_reviews(soup)
    elif name in ('menu',):
        result['structured_content'] = parse_menu(soup)
    elif name in ('about', 'company'):
        result['structured_content'] = parse_about(soup)
    elif name == 'main':
        result['structured_content'] = parse_main(soup)
    
    return result

def parse_contacts(soup):
    """Extract contact information."""
    contacts = {
        'phones': [],
        'emails': [],
        'addresses': [],
        'social_links': [],
        'working_hours': '',
        'raw_text': ''
    }
    
    text = soup.get_text()
    
    # Phone numbers
    phone_pattern = re.compile(r'[\+]?[78][\s\-]?\(?[\d]{3}\)?[\s\-]?[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}')
    phones = phone_pattern.findall(text)
    contacts['phones'] = list(set(phones))
    
    # Also check href="tel:"
    for a in soup.find_all('a', href=re.compile(r'^tel:')):
        phone = a['href'].replace('tel:', '').strip()
        phone_text = a.get_text(strip=True)
        if phone not in contacts['phones']:
            contacts['phones'].append(phone)
    
    # Email addresses
    email_pattern = re.compile(r'[\w\.-]+@[\w\.-]+\.\w+')
    emails = email_pattern.findall(text)
    contacts['emails'] = list(set(emails))
    
    # Also check href="mailto:"
    for a in soup.find_all('a', href=re.compile(r'^mailto:')):
        email = a['href'].replace('mailto:', '').strip()
        if email not in contacts['emails']:
            contacts['emails'].append(email)
    
    # Social links
    for a in soup.find_all('a', href=True):
        href = a['href']
        for social in ['vk.com', 'facebook.com', 'instagram.com', 't.me', 'telegram', 'whatsapp', 'wa.me', 'youtube.com', 'ok.ru']:
            if social in href:
                contacts['social_links'].append({
                    'url': href,
                    'platform': social.split('.')[0]
                })
    
    # Address - look for common patterns
    for tag in soup.find_all(['p', 'div', 'span', 'li']):
        tag_text = tag.get_text(strip=True)
        if any(kw in tag_text.lower() for kw in ['ул.', 'улица', 'пр.', 'проспект', 'москва', 'адрес', 'шоссе', 'пер.', 'наб.']):
            if len(tag_text) < 300:
                contacts['addresses'].append(tag_text)
    
    # Working hours
    for tag in soup.find_all(['p', 'div', 'span', 'li']):
        tag_text = tag.get_text(strip=True)
        if any(kw in tag_text.lower() for kw in ['режим', 'часы', 'работаем', 'пн-', 'пн.', 'с ']):
            if len(tag_text) < 300 and 'час' not in contacts['working_hours']:
                contacts['working_hours'] = tag_text
    
    contacts['raw_text'] = text[:3000]
    return contacts

def parse_faq(soup):
    """Extract FAQ entries."""
    faq = []
    
    # Look for common FAQ patterns - accordion, definition lists, etc.
    # Pattern 1: Accordion/toggle style
    for item in soup.find_all(['div', 'section'], class_=re.compile(r'(faq|question|accordion|toggle|spoiler)', re.I)):
        question = ""
        answer = ""
        
        # Try to find question text
        q_tag = item.find(class_=re.compile(r'(question|title|header|heading)', re.I))
        if q_tag:
            question = q_tag.get_text(strip=True)
        
        a_tag = item.find(class_=re.compile(r'(answer|content|body|text)', re.I))
        if a_tag:
            answer = a_tag.get_text(strip=True)
        
        if question or answer:
            faq.append({
                'question': question,
                'answer': answer
            })
    
    # Pattern 2: Definition lists
    for dt in soup.find_all('dt'):
        dd = dt.find_next_sibling('dd')
        if dd:
            faq.append({
                'question': dt.get_text(strip=True),
                'answer': dd.get_text(strip=True)
            })
    
    # Pattern 3: Headings followed by paragraphs
    if not faq:
        for h in soup.find_all(['h2', 'h3', 'h4']):
            question = h.get_text(strip=True)
            if '?' in question:
                # Collect following paragraphs
                answer_parts = []
                sibling = h.find_next_sibling()
                while sibling and sibling.name in ['p', 'ul', 'ol', 'div']:
                    if sibling.name in ['h2', 'h3', 'h4']:
                        break
                    answer_parts.append(sibling.get_text(strip=True))
                    sibling = sibling.find_next_sibling()
                if answer_parts:
                    faq.append({
                        'question': question,
                        'answer': ' '.join(answer_parts)
                    })
    
    return faq

def parse_reviews(soup):
    """Extract reviews/testimonials."""
    reviews = []
    
    # Look for review blocks
    review_blocks = soup.find_all(['div', 'article', 'section'], 
                                   class_=re.compile(r'(review|testimonial|feedback|otzyv|comment)', re.I))
    
    for block in review_blocks:
        review = {
            'author': '',
            'text': '',
            'rating': '',
            'date': '',
            'event': ''
        }
        
        # Author
        author_tag = block.find(class_=re.compile(r'(author|name|person|client)', re.I))
        if author_tag:
            review['author'] = author_tag.get_text(strip=True)
        
        # Text
        text_tag = block.find(class_=re.compile(r'(text|content|body|message|desc)', re.I))
        if text_tag:
            review['text'] = text_tag.get_text(strip=True)
        else:
            review['text'] = block.get_text(strip=True)
        
        # Rating
        rating_tag = block.find(class_=re.compile(r'(rating|stars|score)', re.I))
        if rating_tag:
            review['rating'] = rating_tag.get_text(strip=True)
        
        # Date
        date_tag = block.find(class_=re.compile(r'(date|time|when)', re.I))
        if date_tag:
            review['date'] = date_tag.get_text(strip=True)
        
        if review['text']:
            reviews.append(review)
    
    # If no structured reviews found, try extracting from text patterns
    if not reviews:
        text = soup.get_text()
        # Look for patterns like «text» — Author
        pattern = re.compile(r'«([^»]+)»\s*—?\s*([А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)*)')
        matches = pattern.findall(text)
        for quote, author in matches:
            if len(quote) > 20:
                reviews.append({
                    'author': author.strip(),
                    'text': quote.strip(),
                    'rating': '',
                    'date': '',
                    'event': ''
                })
    
    return reviews

def parse_menu(soup):
    """Extract menu items."""
    menu_data = {
        'categories': [],
        'items': []
    }
    
    # Look for menu categories and items
    # Common patterns: category headings followed by item lists
    
    current_category = ""
    
    for el in soup.find_all(['h2', 'h3', 'h4', 'div', 'section']):
        class_str = ' '.join(el.get('class', []))
        
        # Category detection
        if el.name in ['h2', 'h3'] and not current_category:
            cat_text = el.get_text(strip=True)
            if cat_text and len(cat_text) < 100:
                current_category = cat_text
                if current_category not in menu_data['categories']:
                    menu_data['categories'].append(current_category)
        
        # Menu item detection - look for price patterns
        text = el.get_text(strip=True)
        price_match = re.search(r'(\d[\d\s]*)\s*(?:руб|₽|р\.|руб\.|рублей)', text, re.I)
        weight_match = re.search(r'(\d+)\s*(?:гр|г\.|г|мл|мл\.|кг|кг\.)', text, re.I)
        
        if price_match and len(text) < 500:
            item = {
                'name': '',
                'description': '',
                'price': price_match.group(1).strip(),
                'weight': weight_match.group(0) if weight_match else '',
                'category': current_category
            }
            
            # Try to extract name (usually before price)
            name_part = text[:price_match.start()].strip()
            # Remove trailing punctuation
            name_part = re.sub(r'[\s·—–-]+$', '', name_part)
            item['name'] = name_part[:200]
            
            menu_data['items'].append(item)
    
    # Also look for structured menu items
    for item_el in soup.find_all(class_=re.compile(r'(menu-item|dish|product|food)', re.I)):
        text = item_el.get_text(strip=True)
        if len(text) < 500:
            menu_data['items'].append({
                'name': text[:100],
                'description': '',
                'price': '',
                'weight': '',
                'category': current_category
            })
    
    return menu_data

def parse_about(soup):
    """Extract about/company information."""
    about = {
        'history': '',
        'philosophy': '',
        'team': [],
        'facts': [],
        'mission': '',
        'raw_text': ''
    }
    
    text = soup.get_text()
    
    # Look for history section
    for h in soup.find_all(['h2', 'h3'], string=re.compile(r'(истори|истор|histor)', re.I)):
        sibling = h.find_next_sibling()
        parts = []
        while sibling and sibling.name in ['p', 'ul', 'ol']:
            parts.append(sibling.get_text(strip=True))
            sibling = sibling.find_next_sibling()
        about['history'] = ' '.join(parts)
    
    # Look for philosophy/mission
    for h in soup.find_all(['h2', 'h3'], string=re.compile(r'(философ|мисси|philosoph|mission|принцип)', re.I)):
        sibling = h.find_next_sibling()
        parts = []
        while sibling and sibling.name in ['p', 'ul', 'ol']:
            parts.append(sibling.get_text(strip=True))
            sibling = sibling.find_next_sibling()
        about['philosophy'] = ' '.join(parts)
    
    # Facts/numbers
    for tag in soup.find_all(class_=re.compile(r'(fact|number|counter|stat|achiev)', re.I)):
        text = tag.get_text(strip=True)
        if text and len(text) < 200:
            about['facts'].append(text)
    
    # Team members
    for tag in soup.find_all(class_=re.compile(r'(team|person|member|employee)', re.I)):
        name = ""
        role = ""
        name_tag = tag.find(class_=re.compile(r'(name|title)', re.I))
        role_tag = tag.find(class_=re.compile(r'(role|position|job)', re.I))
        if name_tag:
            name = name_tag.get_text(strip=True)
        if role_tag:
            role = role_tag.get_text(strip=True)
        if name:
            about['team'].append({'name': name, 'role': role})
    
    about['raw_text'] = text[:5000]
    return about

def parse_main(soup):
    """Extract main page specific content."""
    main = {
        'hero_text': '',
        'services_summary': [],
        'advantages': [],
        'call_to_action': '',
        'partners': [],
        'raw_text': ''
    }
    
    # Hero section
    hero = soup.find(class_=re.compile(r'(hero|banner|main-slider|intro)', re.I))
    if hero:
        main['hero_text'] = hero.get_text(strip=True)[:500]
    
    # Advantages/features
    for tag in soup.find_all(class_=re.compile(r'(advantage|benefit|feature|plus|pro|why)', re.I)):
        text = tag.get_text(strip=True)
        if text and len(text) < 300:
            main['advantages'].append(text)
    
    main['raw_text'] = soup.get_text()[:5000]
    return main

# Main execution
def main():
    print("=" * 60)
    print("Scraping interfood-catering.ru")
    print("=" * 60)
    
    result = {
        'pages': {},
        'contacts': {},
        'menu_data': {},
        'reviews': [],
        'faq': [],
        'all_images': [],
        'all_videos': []
    }
    
    # Parse all pages
    for name, filepath in PAGES.items():
        page_data = parse_page(name, filepath)
        if page_data:
            result['pages'][name] = page_data
    
    # Aggregate specific data
    for name, page in result['pages'].items():
        sc = page.get('structured_content', {})
        
        if name == 'contacts':
            result['contacts'] = sc
        elif name in ('menu',):
            result['menu_data'] = sc
        elif name in ('reviews',):
            result['reviews'] = sc if isinstance(sc, list) else []
        elif name in ('faq',):
            result['faq'] = sc if isinstance(sc, list) else []
    
    # Deduplicate images
    result['all_images'] = sorted(list(all_images))
    result['all_videos'] = sorted(list(all_videos))
    
    # Save to file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"\nSaved to: {OUTPUT_FILE}")
    print(f"Total pages parsed: {len(result['pages'])}")
    print(f"Total images found: {len(result['all_images'])}")
    print(f"Total videos found: {len(result['all_videos'])}")
    
    # Print summary
    for name, page in result['pages'].items():
        print(f"\n--- {name.upper()} ---")
        print(f"  Title: {page['title'][:100]}")
        print(f"  Images: {len(page['images'])}")
        print(f"  Text length: {len(page['text'])} chars")
        if page.get('structured_content'):
            sc = page['structured_content']
            if isinstance(sc, dict):
                for k, v in sc.items():
                    if v:
                        val_str = str(v)[:100]
                        print(f"  {k}: {val_str}")
            elif isinstance(sc, list):
                print(f"  Items: {len(sc)}")

if __name__ == '__main__':
    main()
